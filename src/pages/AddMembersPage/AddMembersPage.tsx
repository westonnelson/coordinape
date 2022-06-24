import React from 'react';

import copy from 'copy-to-clipboard';

import { LoadingModal } from '../../components';
import { useApeSnackbar } from '../../hooks';
import { ICircle } from '../../types';
import { ExternalLinkIcon } from '../../ui/icons/ExternalLinkIcon';
import { useSelectedCircle } from 'recoilState/app';
import { Button, Flex, Panel, Text, TextField } from 'ui';
import { SingleColumnLayout } from 'ui/layouts';

import {
  deleteMagicToken,
  deleteWelcomeToken,
  useMagicToken,
  useWelcomeToken,
} from './useCircleTokens';

const AddMembersPage = () => {
  // const { isMobile } = useMobileDetect();
  const {
    circleId,
    // myUser: me,
    // users: visibleUsers,
    circle,
    // circleEpochsStatus: { epochs: epochsReverse },
  } = useSelectedCircle();

  const { data: magicLinkUuid, refetch: refetchMagicToken } =
    useMagicToken(circleId);
  const { data: welcomeUuid, refetch: refetchWelcomeToken } =
    useWelcomeToken(circleId);

  const revokeMagic = async () => {
    await deleteMagicToken(circleId);
    await refetchMagicToken();
  };

  const revokeWelcome = async () => {
    await deleteWelcomeToken(circleId);
    await refetchWelcomeToken();
  };

  if (!magicLinkUuid || !welcomeUuid) {
    return <LoadingModal visible={true} />;
  }

  // TODO: handle the hostname for local /staging
  const magicLink = 'https://app.coordinape.com/welcome/' + magicLinkUuid;
  const welcomeLink = 'https://app.coordinape.com/join/' + welcomeUuid;
  return (
    <AddMembersContents
      magicLink={magicLink}
      welcomeLink={welcomeLink}
      circle={circle}
      revokeMagic={revokeMagic}
      revokeWelcome={revokeWelcome}
    />
  );
};

type AddMembersContentsProps = {
  magicLink: string;
  welcomeLink: string;
  circle: ICircle;
  revokeMagic(): void;
  revokeWelcome(): void;
};

const AddMembersContents = ({
  magicLink,
  welcomeLink,
  circle,
  revokeMagic,
  revokeWelcome,
}: AddMembersContentsProps) => {
  return (
    <SingleColumnLayout>
      <Panel>
        <Flex css={{ alignItems: 'center', mb: '$sm' }}>
          <Text h2 css={{ my: '$xl' }}>
            Add Member to {circle.name}
          </Text>
        </Flex>
        <div>
          WelcomeLink
          <CopyCodeTextField value={welcomeLink} />
          <Button onClick={revokeWelcome}>refr</Button>
        </div>
        <div>
          MagicLink
          <CopyCodeTextField value={magicLink} />
          <Button onClick={revokeMagic}>refr</Button>
        </div>
      </Panel>
    </SingleColumnLayout>
  );
};

const CopyCodeTextField = ({ value }: { value: string }) => {
  const { apeInfo } = useApeSnackbar();

  const copyToClip = () => {
    copy(value);
    apeInfo('Copied to clipboard');
  };

  return (
    <Flex>
      <TextField
        inPanel
        value={value}
        readOnly={true}
        onClick={copyToClip}
        css={{
          flexGrow: 1,
          cursor: 'pointer',
          width: 'auto',
          height: '$xl',
          fontSize: '$small',
          textAlign: 'left',
          pl: '$sm',
        }}
      />
      <Button color={'transparent'} css={{ ml: '$sm' }} onClick={copyToClip}>
        <ExternalLinkIcon color={'neutral'} size={'md'} />
      </Button>
    </Flex>
  );
};

export default AddMembersPage;
