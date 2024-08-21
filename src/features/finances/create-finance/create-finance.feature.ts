import { Injectable, NotFoundException } from '@nestjs/common';

import {
  CreateFinanceFeatureParams,
  CreateFinanceFeatureResult,
} from './create-finance.types';
import { FinancesRepository } from '../../../database/finances/finance.repository';
import { CategoriesRepository } from '../../../database/categories/category.repository';

@Injectable()
export class CreateFinanceFeature {
  constructor(
    private readonly financesRepository: FinancesRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async execute(
    params: CreateFinanceFeatureParams,
  ): Promise<CreateFinanceFeatureResult> {
    const { categoryId, date, userId, ...rest } = params;
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
