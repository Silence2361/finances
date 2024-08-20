import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FinancesRepository } from '../../../database/repositories/finance.repository';
import { CategoriesRepository } from '../../../database/repositories/category.repository';
import {
  CreateFinanceFeatureParams,
  CreateFinanceFeatureResult,
} from './create-finance.types';
import { ICreateFinance } from '../../../database/finances-database/interfaces/finance.interface';

@Injectable()
export class CreateFinanceFeature {
  constructor(
    private readonly financesRepository: FinancesRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async execute(
    params: CreateFinanceFeatureParams,
    userId: number,
  ): Promise<CreateFinanceFeatureResult> {
    const { categoryId, date, ...rest } = params;
    const finance: CreateFinanceFeatureParams = {
      ...rest,
      categoryId,
      userId,
      date: new Date(date).toISOString(),
    };
    const categoryExists =
      await this.categoriesRepository.findCategoryById(categoryId);
    if (!categoryExists) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }

    const createdFinance = await this.financesRepository.createFinance(finance);
    return { id: createdFinance.id };
  }
}
