import { Injectable } from '@nestjs/common';
import {
  FindMonthlyStatisticsFeatureParams,
  FindTotalStatisticsFeatureResult,
} from './find-monthly-statistics.types';
import { FinancesRepository } from '../../../database/finances/finance.repository';

@Injectable()
export class FindMonthlyStatisticsFeature {
  constructor(private readonly financesRepository: FinancesRepository) {}

  async execute(
    params: FindMonthlyStatisticsFeatureParams,
  ): Promise<FindTotalStatisticsFeatureResult[]> {
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
