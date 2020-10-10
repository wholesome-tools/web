
export interface DiceRollEntry {
  quantity: number;
  sides: number;
}

export interface DiceRollPlan {
  dice: DiceRollEntry[];
}

export interface DiceRollResultEntry {
  sides: number;
  value: number;
}

export interface DiceRollResults {
  dice: DiceRollResultEntry[];
}
