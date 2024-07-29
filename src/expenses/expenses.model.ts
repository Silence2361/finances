import { Model } from 'objection';

export class Expense extends Model {
  static tableName = 'expenses';

  id!: number;
  amount!: number;
  description?: string;
  categoryId!: number;
  userId!: number;
  date!: Date;
  createdAt!: Date;
  updatedAt!: Date;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['amount', 'categoryId', 'userId', 'date'],

      properties: {
        id: { type: 'integer' },
        amount: { type: 'number' },
        description: { type: 'string', maxLength: 300 },
        categoryId: { type: 'integer' },
        userId: { type: 'integer' },
        date: { type: 'string', format: 'date-time' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    };
  }
}
