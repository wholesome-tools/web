import { DiceRollPlan, DiceRollResults, DiceRollResultEntry } from "../dice-model";

export class DiceRollService {
  public static roll(plan: DiceRollPlan): DiceRollResults {
    const results = plan.dice.map(
      ({ quantity, sides }: any) => DiceRollService.range(quantity).map(() => ({
        sides,
        value: DiceRollService.random(1, sides)
      })
    ));
    return {
      dice: results.reduce(
        (r: DiceRollResultEntry[], v: DiceRollResultEntry[]) => [...r, ...v],
        []
      )
    };
  }

  public static range = (count: number): number[] => {
    const arr = [];
    for (let i = 1; i <= count; i++) {
      arr.push(i);
    }
    return arr;
  }

  public static random(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
  }
}
