import { Model } from 'objection';
import { User } from '../users/users.model';
import { Category } from '../categories/categories.model';

export enum FinanceType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export class Finance extends Model {
  static tableName = 'finances';

  id!: number;
  amount!: number;
  date!: string;
  description?: string;
  category_id!: number;
  user_id!: number;
  type!: FinanceType;

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'finances.user_id',
          to: 'users.id',
        },
      },
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'finances.category_id',
          to: 'categories.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['amount', 'date', 'category_id', 'user_id', 'type'],

      properties: {
        id: { type: 'integer' },
        amount: { type: 'number' },
        date: { type: 'string', format: 'date-time' },
        description: { type: ['string', 'null'], maxLength: 300 },
        category_id: { type: 'integer' },
        user_id: { type: 'integer' },
        type: { type: 'string', enum: [FinanceType.INCOME, FinanceType.EXPENSE] }
      },
    };
  }
}
