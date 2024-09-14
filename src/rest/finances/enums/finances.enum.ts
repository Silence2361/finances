import { registerEnumType } from '@nestjs/graphql';

export enum FinanceType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

registerEnumType(FinanceType, {
  name: 'FinanceType',
  description: 'The type of the finance record',
});
