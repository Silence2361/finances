import { Model } from 'objection';

export class Category extends Model {
  static tableName = 'categories';

  id!: number;
  name!: string;



  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }
}