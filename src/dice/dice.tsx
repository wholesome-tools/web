import * as React from 'react';
import { Segment } from '../layout/segment';
import { Heading } from '../layout/heading';
import { Block } from '../layout/block';
import { DicePicker } from './dice-picker';
import { DiceRollPlan, DiceRollResults } from './dice-model';
import { DiceResults } from './dice-results';
import { DiceRollService } from './services/dice-roll-service';

export enum DiceType {
  D6
}

export interface DiceState {
  type: DiceType;
  plan: DiceRollPlan;
  results: DiceRollResults;
}

const DefaultPlan = {
  dice: [
    {
      sides: 6,
      quantity: 3
    }
  ]
};

const NPM_LINK = 'https://www.npmjs.com/package/@wholesome/dice-components'

export class Dice extends React.Component<{}, DiceState> {
  constructor(props: any) {
    super(props);
    const plan = DefaultPlan;
    this.state = {
      type: DiceType.D6,
      plan,
      results: DiceRollService.roll(plan)
    };
  }

  public render() {
    const { type, results } = this.state;
    return (
      <React.Fragment>
        <Block>
          <Segment>
            <Heading>Random number generator</Heading>
          </Segment>
          <Segment>
            <p>
              Playing a game or picking an answer? We have as many dice as you need,
              right here!
            </p>
          </Segment>
          {/*<DicePicker type={type} onTypeChange={this.onTypeChange} />*/}
        </Block>
        <DiceResults
          results={results}
          onQuantityChange={this.onQuantityChange}
          onRollAgain={this.onRollAgain}
        />
        <Block className='borderless'>
          <p>
            Like react components?{' '}
            <a href={NPM_LINK} target='_blank' rel='noopener'>Try the npm library!</a>
          </p>
        </Block>
      </React.Fragment>
    );
  }

  public onQuantityChange = (num: number) => {
    if (num < 1 || Number.isNaN(num)) {
      return;
    }
    const plan = this.state.plan;
    plan.dice[0].quantity = num;
    this.setState({
      plan,
      results: DiceRollService.roll(plan)
    });
  }

  public onRollAgain = () => {
    this.setState({
      results: DiceRollService.roll(this.state.plan)
    });
  }

  public onTypeChange = (type: DiceType) => {
    this.setState({
      type
    });
  }
}
