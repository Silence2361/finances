import { Model } from 'objection';

export class User extends Model {
  static tableName = 'users';

  id!: number;
  email!: string;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],

      properties: {
        id: { type: 'integer' },
        email: { type: 'string', format: 'email', minLength: 1, maxLength: 40 },
        password: { type: 'string', minLength: 6, maxLength: 18 },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    };
  }
}
