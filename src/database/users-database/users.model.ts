import { Model } from 'objection';
import { Finance } from '../finances-database/finances.model';

export enum UserRole {
  USER = 'user',
}

export class User extends Model {
  static tableName = 'users';
  static schemaName = 'public';

  id: number;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;

  static get relationMappings() {
    return {
      finances: {
        relation: Model.HasManyRelation,
        modelClass: Finance,
        join: {
          from: 'users.id',
          to: 'finances.userId',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password', 'role'],

      properties: {
        id: { type: 'integer' },
        email: { type: 'string', format: 'email', minLength: 6, maxLength: 40 },
        password: { type: 'string', minLength: 6, maxLength: 255 },
        role: {
          type: 'string',
          enum: Object.values(UserRole),
          default: UserRole.USER,
        },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    };
  }
}
