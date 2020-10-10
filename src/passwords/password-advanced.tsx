import * as React from 'react';
import { TextField, Checkbox, FormControlLabel } from "@material-ui/core";
import styled from 'styled-components';

const AdvancedWrap = styled.div`
  padding-top: 1rem;
`;

const AdvancedLength = styled.div`
  padding-top: 1.25rem;

  .text {
    vertical-align: baseline;
    margin-right: 1rem;
    display: inline-block;
  }

  input {
    vertical-align: baseline;
    padding: 3px 0;
  }
`;

export interface PasswordAdvancedProps {
  options: any;
  onOptionCheckboxChange: (field: any) => void;
  onOptionTextChange: (event: any, field: any) => void;
}

export class PasswordAdvanced extends React.Component<PasswordAdvancedProps> {
  public render() {
    const { options, onOptionTextChange, onOptionCheckboxChange } = this.props;

    const fields = [
      ['minLowercase', options.minLowercase, 'Lowercase letters. Minimum', 1],
      ['minUppercase', options.minUppercase, 'Uppercase letters. Minimum', 1],
      ['minNumber', options.minNumber, 'Numbers. Minimum', 1],
      ['minSymbols', options.minSymbols, 'Symbols. Minimum', 1],
      ['chunkSize', options.chunkSize, 'Chunking. Size', 3],
    ];

    return (
      <AdvancedWrap>
        {fields.map((field: any) => (
          <FormControlLabel
            label={(
              <span className='label'>
                <span className='text'>{field[2]}:</span>
                <TextField
                  value={field[1]}
                  style={{ width: '40px' }}
                  margin='none'
                  disabled={!(field[1] > 0)}
                  onChange={(event) => onOptionTextChange(event, field)}
                />
              </span>
            )}
            control={(
              <Checkbox
                onChange={() => onOptionCheckboxChange(field)}
                checked={field[1] > 0}
              />
            )}
          />
        ))}
        <AdvancedLength>
          <span className='text'>
            Length (excluding chunking):
          </span>
          <TextField
            value={options.length}
            style={{ width: '40px' }}
            margin='none'
            onChange={(event) => onOptionTextChange(event, ['length'])}
          />
        </AdvancedLength>
      </AdvancedWrap>
    );
  }
}
