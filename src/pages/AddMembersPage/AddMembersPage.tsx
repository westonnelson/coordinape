import React, { ReactNode, useState } from 'react';

import copy from 'copy-to-clipboard';

import { LoadingModal } from '../../components';
import { useApeSnackbar } from '../../hooks';
import { Box } from '../../ui/Box/Box';
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
  const magicLink = 'https://app.coordinape.com/join/' + magicLinkUuid;
  const welcomeLink = 'https://app.coordinape.com/welcome/' + welcomeUuid;

  const enum Tab {
    ETH,
    CSV,
    LINK,
  }

  const AddMembersContents = () => {
    const [currentTab, setCurrentTab] = useState<Tab>(Tab.ETH);

    const TabButton = ({
      tab,
      children,
    }: {
      tab: Tab;
      children: ReactNode;
    }) => {
      return (
        <Button
          color={currentTab === tab ? 'secondary' : undefined}
          // outlined={currentTab == tab ? undefined : true}
          css={{ borderRadius: '$pill', mr: '$md' }}
          onClick={() => setCurrentTab(tab)}
        >
          {children}
        </Button>
      );
    };

    return (
      <SingleColumnLayout>
        <Panel>
          <Flex css={{ alignItems: 'center', mb: '$sm' }}>
            <Text h1 css={{ my: '$xl' }}>
              Add Member to {circle.name}
            </Text>
          </Flex>
          <Flex>
            <TabButton tab={Tab.ETH}>ETH Address</TabButton>
            <TabButton tab={Tab.CSV}>CSV Import</TabButton>
            <TabButton tab={Tab.LINK}>Join Link</TabButton>
          </Flex>
          {currentTab === Tab.ETH && (
            <Box>
              <Box>Eth addr</Box>
              <Box>
                <EthAndNameEntry />
                <EthAndNameEntry />
                <EthAndNameEntry />
                <EthAndNameEntry />
              </Box>
              <Box>
                <div>
                  WelcomeLink
                  <CopyCodeTextField value={welcomeLink} />
                  <Button onClick={revokeWelcome}>refr</Button>
                </div>
              </Box>
            </Box>
          )}
          {currentTab === Tab.CSV && (
            <Box>
              <Box>CSV Import</Box>
              <Box>
                <div>
                  WelcomeLink
                  <CopyCodeTextField value={welcomeLink} />
                  <Button onClick={revokeWelcome}>refr</Button>
                </div>
              </Box>
            </Box>
          )}
          {currentTab === Tab.LINK && (
            <>
              <div>
                MagicLink
                <CopyCodeTextField value={magicLink} />
                <Button onClick={revokeMagic}>refr</Button>
              </div>
            </>
          )}
        </Panel>
      </SingleColumnLayout>
    );
  };

  return <AddMembersContents />;
};

const EthAndNameEntry = () => {
  // TODO: add zod validation and react form hook stuff??
  return (
    <Flex>
      <Box>
        <Text variant={'label'}>ETH Address</Text>
        <TextField placeholder="ETH Address or ENS" />
      </Box>
      <Box>
        <Text variant={'label'}>Name</Text>
        <TextField placeholder="Name" />
      </Box>
    </Flex>
  );
};

// TODO: move this into components? Generally useful?
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
