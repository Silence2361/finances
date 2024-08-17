import { Injectable } from '@nestjs/common';
import {
  ICategoryStatistics,
  IFindFinancesResponse,
} from '../../database/finances-database/interfaces/finance.interface';
import { FinancesRepository } from '../../database/repositories/finance.repository';

@Injectable()
export class FinancesQueryService {
  constructor(private readonly financesRepository: FinancesRepository) {}

  async findFinances(
    userId: number,
    type?: string,
  ): Promise<IFindFinancesResponse> {
    const finances = await this.financesRepository.findFinances(userId, type);
    return { finances };
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
