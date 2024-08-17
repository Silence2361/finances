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
}
