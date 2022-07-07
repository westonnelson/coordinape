/* eslint-disable */

import type { VercelRequest, VercelResponse } from '@vercel/node';

import { authCircleAdminMiddleware } from '../../../../api-lib/circleAdmin';
import { adminClient } from '../../../../api-lib/gql/adminClient';
import { getAddress } from '../../../../api-lib/gql/queries';
import { UnprocessableError } from '../../../../api-lib/HttpError';
import { CircleTokenType } from '../../../../src/common-lib/circleShareTokens';
import {
  createUserFromTokenInput,
  HasuraUserSessionVariables,
  composeHasuraActionRequestBodyWithSession,
} from '../../../../src/lib/zod';

import { createUserMutation } from './createUserMutation';
import { verifyHasuraRequestMiddleware } from '../../../../api-lib/validate';

async function handler(req: VercelRequest, res: VercelResponse) {
  const {
    input: { payload: input },
    session_variables: sessionVariables,
  } = composeHasuraActionRequestBodyWithSession(
    createUserFromTokenInput,
    HasuraUserSessionVariables
  ).parse(req.body);

  // get address from currrent user
  const { hasuraProfileId } = sessionVariables;
  console.log('getting addr');
  const address = await getAddress(hasuraProfileId);

  console.log('getting tokens');
  // get the circleId from the token and make sure its magic
  const { circle_share_tokens } = await adminClient.query({
    circle_share_tokens: [
      {
        where: {
          uuid: {
            _eq: input.token,
          },
          type: {
            _eq: CircleTokenType.Magic,
          },
        },
      },
      {
        circle_id: true,
      },
    ],
  });

  const circleId = circle_share_tokens.pop()?.circle_id;
  if (!circleId) {
    throw new UnprocessableError('invalid circle link');
  }

  console.log('creating user');

  // create the user
  const mutationResult = await createUserMutation(address, circleId, {
    name: input.name,
    circle_id: circleId,
    // TODO: are these defaulted? ??
    // give_token_remaining: input.starting_tokens,
    // starting_tokens:input.starting_tokens,
  });

  return res
    .status(200)
    .json(mutationResult.insert_users_one ?? mutationResult.update_users_by_pk);
}

export default verifyHasuraRequestMiddleware(handler);
