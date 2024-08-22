import { Injectable } from '@nestjs/common';
import {
  FindTotalStatisticsFeatureParams,
  FindTotalStatisticsFeatureResult,
} from './find-total-statistics.types';
import { FinancesRepository } from '../../../database/finances/finance.repository';

@Injectable()
export class FindTotalStatisticsFeature {
  constructor(private readonly financesRepository: FinancesRepository) {}

  async execute(
    params: FindTotalStatisticsFeatureParams,
  ): Promise<FindTotalStatisticsFeatureResult[]> {
    const { userId } = params;

    const statisctics =
      await this.financesRepository.findTotalStatistics(userId);

    return statisctics.map((stat) => ({
      type: stat.type,
      categoryId: stat.categoryId,
      totalAmount: stat.totalAmount,
    }));
  }
}
