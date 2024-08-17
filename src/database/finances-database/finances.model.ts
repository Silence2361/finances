import { Model } from 'objection';
import { User } from '../users-database/users.model';
import { Category } from '../categories-database/categories.model';

export enum FinanceType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export class Finance extends Model {
  static tableName = 'finances';

  id: number;
  amount: number;
  date: string;
  description?: string;
  categoryId: number;
  userId: number;
  type: FinanceType;

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'finances.userId',
          to: 'users.id',
        },
      },
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'finances.categoryId',
          to: 'categories.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['amount', 'date', 'categoryId', 'userId', 'type'],

      properties: {
        id: { type: 'integer' },
        amount: { type: 'number' },
        date: { type: 'string', format: 'date-time' },
        description: { type: ['string', 'null'], maxLength: 300 },
        categoryId: { type: 'integer' },
        userId: { type: 'integer' },
        type: {
          type: 'string',
          enum: [FinanceType.INCOME, FinanceType.EXPENSE],
        },
      },
    };
  }
}
