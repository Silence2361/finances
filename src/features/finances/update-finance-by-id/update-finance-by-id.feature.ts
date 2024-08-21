import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  UpdateFinanceByIdParams,
  UpdateFinanceByIdResult,
} from './update-finance-by-id.types';
import { FinancesRepository } from '../../../database/finances/finance.repository';
import { CategoriesRepository } from '../../../database/categories/category.repository';

@Injectable()
export class UpdateFinanceByIdFeature {
  constructor(
    private readonly financesRepository: FinancesRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async execute(
    financeId: number,
    params: UpdateFinanceByIdParams,
  ): Promise<UpdateFinanceByIdResult | null> {
    const { categoryId, date, userId, ...rest } = params;
    const finance = await this.financesRepository.findFinanceById(financeId);
    if (!finance) {
      throw new NotFoundException('Finance record not found');
    }
    if (finance.userId !== userId) {
      throw new ForbiddenException();
    }
    if (categoryId) {
      const categoryExists =
        await this.categoriesRepository.findCategoryById(categoryId);
      if (!categoryExists) {
        throw new NotFoundException(`Category with id ${categoryId} not found`);
      }
    }

    const updatedFinance: Partial<UpdateFinanceByIdParams> = {
      ...rest,
      userId,
      categoryId,
      date: date ? new Date(date).toISOString() : finance.date,
    };

    const result = await this.financesRepository.updateFinanceById(
      financeId,
      updatedFinance,
    );

    return result;
  }
}
