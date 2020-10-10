import * as React from 'react';
import { Segment } from '../layout/segment';
import { DiceType } from './dice';
import { Dice, Shape } from '@wholesome/dice-components';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { DICE_COLOR } from '../colors';
import classNames from 'classnames';

export interface DicePickerProps {
  type: DiceType;
  onTypeChange: (type: DiceType) => void;
}

const ButtonLabelWrap = styled.div`
  display: inline-block;
  padding-left: 12px;
  line-height: 20px;

  &.selected {
    color: ${DICE_COLOR};
    font-weight: bold !important;
  }
`;

export class DicePicker extends React.Component<DicePickerProps> {
  public render() {
    const { type } = this.props;
    return (
      <Segment>
        {[6].map(num => (
          <Button>
            <Dice
              key={num}
              sides={num}
              value={num}
              size={32}
              shape={this.getShape(num, type)}
              background={DICE_COLOR}
            />
            <ButtonLabelWrap className={classNames({ selected: this.isSelected(num, type) })}>
              D{num}
            </ButtonLabelWrap>
          </Button>
        ))}
      </Segment>
    );
  }

  public getShape = (sides: number, type: DiceType): Shape => {
    return this.isSelected(sides, type)
      ? Shape.Solid
      : Shape.Outline;
  }

  public isSelected = (sides: number, type: DiceType): boolean => {
    const SELECTED_MAP: { [key: string]: DiceType } = {
      '6': DiceType.D6
    };
    return SELECTED_MAP[String(sides)] === type;
  }
}
