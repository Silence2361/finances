import { Model } from 'objection';
import { Finance } from '../finances-database/finances.model';

export class Category extends Model {
  static tableName = 'categories';

  id: number;
  name: string;

  static get relationMappings() {
    return {
      finances: {
        relation: Model.HasManyRelation,
        modelClass: Finance,
        join: {
          from: 'categories.id',
          to: 'finances.categoryId',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 26 },
      },
    };
  }
}
