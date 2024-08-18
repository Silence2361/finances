import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FinancesRepository } from '../../database/repositories/finance.repository';
import {
  ICreateFinance,
  ICreateFinanceResponse,
  IFinance,
  IUpdateFinance,
  IUpdateFinanceResponse,
} from '../../database/finances-database/interfaces/finance.interface';
import { CategoriesRepository } from '../../database/repositories/category.repository';

@Injectable()
export class FinancesService {
  constructor(
    private readonly financesRepository: FinancesRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async createFinance(
    createFinanceData: ICreateFinance,
    userId: number,
  ): Promise<ICreateFinanceResponse> {
    const { categoryId, date, ...rest } = createFinanceData;
    const finance: ICreateFinance = {
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

  async updateFinanceById(
    financeId: number,
    updateFinanceData: IUpdateFinance,
    userId: number,
  ): Promise<IUpdateFinanceResponse | null> {
    const { categoryId, date, ...rest } = updateFinanceData;
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

    const updatedFinance: Partial<IFinance> = {
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

  async deleteFinanceById(financeId: number, userId: number): Promise<void> {
    const finance = await this.financesRepository.findFinanceById(financeId);
    if (!finance) {
      throw new NotFoundException('Finance record not found');
    }
    if (finance.userId !== userId) {
      throw new ForbiddenException();
    }
    await this.financesRepository.deleteFinanceById(financeId);
  }
}
