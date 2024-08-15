import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFinanceDto } from './dto/create.finances.dto';
import { UpdateFinanceDto } from './dto/update.finance.dto';
import { FinancesRepository } from '../repositories/finance.repository';
import { IFinance } from './interfaces/finance.interface';
import { CategoriesRepository } from '../repositories/category.repository';

@Injectable()
export class FinancesService {
  constructor(
    private readonly financesRepository: FinancesRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async addFinance(
    createFinanceDto: CreateFinanceDto,
    userId: number,
  ): Promise<IFinance> {
    const finance: IFinance = {
      ...createFinanceDto,
      user_id: userId,
      category_id: createFinanceDto.category_id,
      date: new Date(createFinanceDto.date).toISOString(),
    };
    return await this.financesRepository.addFinance(finance);
  }

  async getFinances(userId: number, type?: string): Promise<IFinance[]> {
    return await this.financesRepository.getFinances(userId, type);
  }

  async updateFinanceById(
    id: number,
    updateFinanceDto: UpdateFinanceDto,
    userId: number,
  ): Promise<IFinance | null> {
    const finance = await this.financesRepository.findFinanceById(id);
    if (!finance) {
      throw new NotFoundException('Finance record not found');
    }
    if (finance.user_id !== userId) {
      throw new ForbiddenException();
    }
    if (updateFinanceDto.category_id) {
      const categoryExists = await this.categoriesRepository.findCategoryById(
        updateFinanceDto.category_id,
      );
      if (!categoryExists) {
        throw new NotFoundException(
          `Category with id ${updateFinanceDto.category_id} not found`,
        );
      }
    }

    const updatedFinance: Partial<IFinance> = {
      ...updateFinanceDto,
      user_id: userId,
      date: updateFinanceDto.date
        ? new Date(updateFinanceDto.date).toISOString()
        : finance.date,
    };

    const result = await this.financesRepository.updateFinanceById(
      id,
      updatedFinance,
    );

    return result;
  }

  async removeFinanceById(id: number, userId: number): Promise<void> {
    const finance = await this.financesRepository.findFinanceById(id);
    if (!finance) {
      throw new NotFoundException('Finance record not found');
    }
    if (finance.user_id !== userId) {
      throw new ForbiddenException();
    }
    await this.financesRepository.removeFinanceById(id, userId);
  }

  async getCategoryStatistics(userId: number): Promise<any> {
    try {
      const result =
        await this.financesRepository.getCategoryStatistics(userId);
      if (result.length === 0) {
        throw new NotFoundException('No records found');
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to get category statistics',
      );
    }
  }

  async getTotalStatistics(userId: number): Promise<any> {
    const result = await this.financesRepository.getTotalStatistics(userId);
    if (result.length === 0) {
      throw new NotFoundException('No records found');
    }
    return result;
  }

  async getMonthlyStatistics(
    userId: number,
    month: number,
    year: number,
  ): Promise<any> {
    const result = await this.financesRepository.getMonthlyStatistics(
      userId,
      month,
      year,
    );
    if (result.length === 0) {
      throw new NotFoundException('No records found');
    }
    return result;
  }
}
