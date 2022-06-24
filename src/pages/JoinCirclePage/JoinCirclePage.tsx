/* eslint-disable */

import React, { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import { Box } from '../../ui/Box/Box';
import { Button } from '../../ui/Button/Button';

import { CircleTokenType } from '../AddMembersPage/useCircleTokens';
import { TokenJoinInfo } from '../../../api/circle/landing/[token]';
import { LoadingModal } from '../../components';
import { fetchManifest, getProfile } from '../../lib/gql/queries';
import { useMyProfile } from '../../recoilState';

export const JoinCirclePage = () => {
  const { token } = useParams();

  const { myUsers } = useMyProfile();

  const [tokenError, setTokenError] = useState<string | undefined>();
  const [tokenJoinInfo, setTokenJoinInfo] = useState<
    TokenJoinInfo | undefined
  >();

  useEffect(() => {
    const fn = async () => {
      // const tokenReq =
      try {
        const res = await fetch('/api/circle/landing/' + token);
        if (!res.ok) {
          setTokenError('invalid invite link');
          return;
        }
        const info: TokenJoinInfo = JSON.parse(await res.text());

        if (info.type === CircleTokenType.Welcome) {
          // they should already be a member with this address, lets find out?
          let found = false;
          for (let user of myUsers) {
            if (user.circle_id === info.circle.id) {
              found = true;
              break;
            }
          }
          if (!found) {
            setTokenError(
              'This address has not been invited to the circle. Try contacting the admins \
                or connecting with a different address.'
            );
            return;
          }
        }
        setTokenJoinInfo(info);
      } catch (e) {
        setTokenError('Network error validating invite link');
      }
    };
    fn()
      .then()
      .catch(e => {
        if (e instanceof Error) {
          setTokenError(e.message ?? 'no luck mate');
        } else {
          setTokenError('invalid token');
        }
      });
  });
  if (!tokenError && !tokenJoinInfo) {
    return <LoadingModal visible={true} />;
  }
  return (
    <>
      {tokenError && <Box>Error! {tokenError}</Box>}
      {tokenJoinInfo && (
        <>
          <Box>Join {tokenJoinInfo.circle.name}</Box>
          <Box>
            In the {tokenJoinInfo.circle.organization.name} organization.
          </Box>
          <Box>
            {tokenJoinInfo.type === CircleTokenType.Magic ? (
              'Magic Link!'
            ) : (
              <Box>
                You are now a member of the circle. Get started here:
                <Button>
                  {/* TODO: /history?? */}
                  <Link to={'/circles/' + tokenJoinInfo.circle.id + '/history'}>
                    {tokenJoinInfo.circle.name}
                  </Link>
                </Button>
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default JoinCirclePage;
