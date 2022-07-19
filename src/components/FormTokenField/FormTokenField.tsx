import React from 'react';

import { DeprecatedApeTextField } from 'components';

export const FormTokenField = ({
  value,
  symbol,
  // TODO: Handle decimals correctly.
  // value should be uint256 compatible
  // but then displayed in the text field as a float.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  decimals,
  max,
  onChange,
  helperText,
  error,
  errorText,
  ...props
}: Omit<React.ComponentProps<typeof DeprecatedApeTextField>, 'onChange'> & {
  max: number;
  symbol: string;
  decimals: number;
  onChange: (newValue: number) => void;
  errorText?: string;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    !Number.isNaN(num) && onChange(num);
  };

  return (
    <DeprecatedApeTextField
      {...props}
      InputProps={{
        startAdornment: <span onClick={() => onChange(Number(max))}>MAX</span>,
        endAdornment: symbol.toUpperCase(),
      }}
      apeVariant="token"
      error={error}
      helperText={!errorText ? helperText : errorText}
      value={value}
      onChange={handleChange}
      type="number"
      onFocus={event => (event.currentTarget as HTMLInputElement).select()}
    />
  );
};
