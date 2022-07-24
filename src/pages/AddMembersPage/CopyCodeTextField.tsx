import React from 'react';

import copy from 'copy-to-clipboard';

import { useApeSnackbar } from '../../hooks';
import { Button, Flex, TextField } from '../../ui';
import { ExternalLinkIcon } from '../../ui/icons/ExternalLinkIcon';

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

export default CopyCodeTextField;
