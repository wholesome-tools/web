import { TextField } from '@material-ui/core';
import * as React from 'react';
import { Segment } from '../layout/segment';
import styled from 'styled-components';

const StyledTextField = styled(TextField)`
  input {
    width: 100px;
  }
`;

export interface PasswordCountSelectProps {
  count: number;
  onChange: (count: number) => void;
}

export class PasswordCountSelect extends React.Component<PasswordCountSelectProps> {
  public render() {
    const { count } = this.props;
    return (
      <Segment>
        <StyledTextField label='Count' onFocus={this.onFocus} value={count} onChange={this.onCountChange} />
      </Segment>
    );
  }

  public onFocus = (ev: any) => {
    ev.target.select();
  };

  public onCountChange = (ev: any) => {
    this.props.onChange(ev.target.value);
  }
}
