import { Injectable } from '@nestjs/common';
import {
  GetMonthlyStatisticsFeatureParams,
  GetTotalStatisticsFeatureResult,
} from './get-monthly-statistics.types';
import { FinancesRepository } from '../../../database/finances/finance.repository';

@Injectable()
export class GetMonthlyStatisticsFeature {
  constructor(private readonly financesRepository: FinancesRepository) {}

  async execute(
    params: GetMonthlyStatisticsFeatureParams,
  ): Promise<GetTotalStatisticsFeatureResult[]> {
    const { userId, month, year } = params;
    const statisctics = await this.financesRepository.findMonthlyStatistics(
      userId,
      month,
      year,
    );

    return statisctics.map((stat) => ({
      type: stat.type,
      categoryId: stat.categoryId,
      totalAmount: stat.totalAmount,
    }));
  }
}
