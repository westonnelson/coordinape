import type { VercelRequest, VercelResponse } from '@vercel/node';

import { adminClient } from '../../../api-lib/gql/adminClient';
import { errorResponse } from '../../../api-lib/HttpError';
import { Awaited } from '../../../api-lib/ts4.5shim';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // TODO: does this have some kind of CORS protection?
  try {
    let token: string | undefined;
    if (typeof req.query.token == 'string') {
      token = req.query.token;
    } else {
      const oneToken = req.query.token.pop();
      if (oneToken) {
        token = oneToken;
      }
    }

    if (!token) {
      throw new Error('empty token provided');
    }
    const circle = await circleFromToken(token);
    return res.status(200).send(circle);
  } catch (error: any) {
    errorResponse(res, error);
  }
}

async function circleFromToken(token: string) {
  const { circle_share_tokens } = await adminClient.query({
    circle_share_tokens: [
      {
        where: {
          uuid: {
            _eq: token,
          },
        },
      },
      {
        type: true,
        circle: {
          id: true,
          logo: true,
          name: true,
          organization: {
            name: true,
            logo: true,
          },
        },
      },
    ],
  });

  const tokenResult = circle_share_tokens?.pop();
  if (!tokenResult || !tokenResult.circle) {
    throw new Error('invalid token provided or not found');
  }
  return tokenResult;
}

export type TokenJoinInfo = Awaited<ReturnType<typeof circleFromToken>>;
