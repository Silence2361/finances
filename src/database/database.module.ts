import { Module, Global } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { UsersRepository } from './users/user.repository';
import { User } from './users/users.model';
import { CategoriesRepository } from './categories/category.repository';
import { Category } from './categories/categories.model';
import { Finance } from './finances/finances.model';
import { FinancesRepository } from './finances/finance.repository';

@Global()
@Module({
  imports: [ObjectionModule.forFeature([User, Category, Finance])],
  providers: [UsersRepository, CategoriesRepository, FinancesRepository],
  exports: [
    UsersRepository,
    ObjectionModule,
    CategoriesRepository,
    FinancesRepository,
  ],
})
export class DatabaseModule {}
