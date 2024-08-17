import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FinancesRepository } from '../../database/repositories/finance.repository';
import {
  ICategoryStatistics,
  ICreateFinance,
  ICreateFinanceResponse,
  IFinance,
  IFindFinancesResponse,
  IUpdateFinance,
} from '../../database/finances-database/interfaces/finance.interface';
import { CategoriesRepository } from '../../database/repositories/category.repository';

@Injectable()
export class FinancesService {
  constructor(
    private readonly financesRepository: FinancesRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async createFinance(
    createFinance: ICreateFinance,
    userId: number,
  ): Promise<ICreateFinanceResponse> {
    const finance: ICreateFinance = {
      ...createFinance,
      userId,
      date: new Date(createFinance.date).toISOString(),
    };
    const categoryExists = await this.categoriesRepository.findCategoryById(
      createFinance.categoryId,
    );
    if (!categoryExists) {
      throw new NotFoundException(
        `Category with id ${createFinance.categoryId} not found`,
      );
    }

    const createdFinance = await this.financesRepository.createFinance(finance);
    return { id: createdFinance.id };
  }

  async findFinances(
    userId: number,
    type?: string,
  ): Promise<IFindFinancesResponse> {
    const finances = await this.financesRepository.findFinances(userId, type);
    return { finances };
  }

  async updateFinanceById(
    id: number,
    updateFinance: IUpdateFinance,
    userId: number,
  ): Promise<IFinance | null> {
    const finance = await this.financesRepository.findFinanceById(id);
    if (!finance) {
      throw new NotFoundException('Finance record not found');
    }
    if (finance.userId !== userId) {
      throw new ForbiddenException();
    }
    if (updateFinance.categoryId) {
      const categoryExists = await this.categoriesRepository.findCategoryById(
        updateFinance.categoryId,
      );
      if (!categoryExists) {
        throw new NotFoundException(
          `Category with id ${updateFinance.categoryId} not found`,
        );
      }
    }

    const updatedFinance: Partial<IFinance> = {
      ...updateFinance,
      userId,
      date: updateFinance.date
        ? new Date(updateFinance.date).toISOString()
        : finance.date,
    };

    const result = await this.financesRepository.updateFinanceById(
      id,
      updatedFinance,
    );

    return result;
  }

  async deleteFinanceById(id: number, userId: number): Promise<void> {
    const finance = await this.financesRepository.findFinanceById(id);
    if (!finance) {
      throw new NotFoundException('Finance record not found');
    }
    if (finance.userId !== userId) {
      throw new ForbiddenException();
    }
    await this.financesRepository.deleteFinanceById(id);
  }

  async findCategoryStatistics(userId: number): Promise<ICategoryStatistics> {
    return this.financesRepository.findCategoryStatistics(userId);
  }

  async findTotalStatistics(userId: number): Promise<any> {
    return this.financesRepository.findTotalStatistics(userId);
  }

  async findMonthlyStatistics(
    userId: number,
    month: number,
    year: number,
  ): Promise<any> {
    return this.financesRepository.findMonthlyStatistics(userId, month, year);
  }
}
