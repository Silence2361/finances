import { Module } from '@nestjs/common';
import { UpdateUserModule } from './users/update-user/update-user.module';
import { CreateUserModule } from './users/create-user/create-user.module';
import { GetUsersModule } from './users/get-users/get-users.module';
import { GetUserByIdModule } from './users/get-user-by-id/get-user-by-id.module';
import { DeleteUserByIdModule } from './users/delete-user-by-id/delete-user-by-id.module';
import { CreateCategoryModule } from './categories/create-category/create-category.module';
import { UpdateCategoryByIdModule } from './categories/update-category-by-id/update-category-by-id.module';
import { GetCategoriesModule } from './categories/get-categories/get-categories.module';
import { GetCategoryByIdModule } from './categories/get-category-by-id/get-category-by-id.module';
import { DeleteCategoryByIdModule } from './categories/delete-category-by-id/delete-category-by-id.module';
import { CreateFinanceModule } from './finances/create-finance/create-finance.module';
import { UpdateFinanceByIdModule } from './finances/update-finance-by-id/update-finance-by-id.module';
import { DeleteFinanceByIdModule } from './finances/delete-finance-by-id/delete-finance-by-id.module';
import { FindFinancesModule } from './finances/find-finances/find-finances.module';

@Module({
  imports: [
    CreateUserModule,
    UpdateUserModule,
    GetUsersModule,
    GetUserByIdModule,
    DeleteUserByIdModule,
    CreateCategoryModule,
    UpdateCategoryByIdModule,
    GetCategoriesModule,
    GetCategoryByIdModule,
    DeleteCategoryByIdModule,
    CreateFinanceModule,
    UpdateFinanceByIdModule,
    DeleteFinanceByIdModule,
    FindFinancesModule,
  ],
  exports: [
    CreateUserModule,
    UpdateUserModule,
    GetUsersModule,
    GetUserByIdModule,
    DeleteUserByIdModule,
    CreateCategoryModule,
    UpdateCategoryByIdModule,
    GetCategoriesModule,
    GetCategoryByIdModule,
    DeleteCategoryByIdModule,
    CreateFinanceModule,
    UpdateFinanceByIdModule,
    DeleteFinanceByIdModule,
    FindFinancesModule,
  ],
})
export class FeaturesModule {}
