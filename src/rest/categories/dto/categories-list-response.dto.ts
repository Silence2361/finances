import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CategoryDto } from './category.dto';

@ObjectType()
export class CategoriesListResponseDto {
  @Field(() => [CategoryDto])
  docs: CategoryDto[];

  @Field(() => Int)
  count: number;
}
