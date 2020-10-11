import * as React from 'react';
import { DiceRollResults } from './dice-model';
import { Block } from '../layout/block';
import { Dice } from '@wholesome/dice-components';
import { DICE_COLOR } from '../colors';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const AllDiceContainer = styled.div`
  text-align: center;
  padding: 30px 0 0 0;
`;

const SingleDiceContainer = styled.div`
  display: inline-block;
  margin-right: 20px;
  padding-bottom: 10px;
`;

const DiceTools = styled.div`
  text-align: center;
  padding: 20px 0 30px 0;
`;

const DiceToolItem = styled.div`
  display: inline-block;
  padding-right: 20px;
`;

const DiceToolLabel = styled.div`
  display: inline-block;
  vertical-align: baseline;
  padding-right: 5px;
  &:after {
    content: ":";
  }
`;

const DiceToolValue = styled.strong`
  display: inline-block;
  vertical-align: baseline;
`;

export interface DiceResultsProps {
  results: DiceRollResults;
  onQuantityChange: (num: number) => void;
  onRollAgain: () => void;
}

export class DiceResults extends React.Component<DiceResultsProps> {
  public render() {
    const { results } = this.props;
    const sum = results.dice.reduce((r, v) => r + v.value, 0);
    const avg = sum / results.dice.length;
    return (
      <Block>
        <AllDiceContainer>
          {results.dice.map((result, idx) => (
            <SingleDiceContainer>
              <Dice
                key={idx}
                sides={result.sides}
                value={result.value}
                size={64}
                background={DICE_COLOR}
              />
            </SingleDiceContainer>
          ))}
        </AllDiceContainer>
        <DiceTools>
          <DiceToolItem>
            <DiceToolLabel>
              Dice
            </DiceToolLabel>
            <DiceToolValue>
              <TextField
                defaultValue={results.dice.length}
                style={{ maxWidth: '40px', textAlign: 'center', verticalAlign: 'baseline' }}
                onChange={this.onQuantityChange}
                onFocus={this.onFocus}
              />
            </DiceToolValue>
          </DiceToolItem>
          <DiceToolItem>
            <DiceToolLabel>
              Sum
            </DiceToolLabel>
            <DiceToolValue>
              {sum}
            </DiceToolValue>
          </DiceToolItem>
          <DiceToolItem>
            <DiceToolLabel>
              Average
            </DiceToolLabel>
            <DiceToolValue>
              {DiceResults.round(avg)}
            </DiceToolValue>
          </DiceToolItem>
          <DiceToolItem>
            <a href='#' onClick={this.onRollAgain}>Roll again</a>
          </DiceToolItem>
        </DiceTools>
      </Block>
    );
  }

  public onQuantityChange = (event: any) => {
    this.props.onQuantityChange(Number(event.target.value));
  }

  public onFocus = (event: any) => {
    event.target.select();
  }

  public onRollAgain = () => {
    this.props.onRollAgain();
  }

  public static round = (num: number) => {
    return Math.round(num * 100) / 100;
  }
}
