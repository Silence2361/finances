import { Model } from 'objection';

export class Category extends Model {
  static tableName = 'categories';

  id!: number;
  name!: string;
  type!: 'income' | 'expense';
  userId!: number;
  createdA!: Date;
  updatedAt!: Date;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'type', 'userId'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 20 },
        type: { type: 'string', enum: ['income', 'expense'] },
        userId: { type: 'integer' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    };
  }
}
