import { Injectable } from '@nestjs/common';
import {
  GetTotalStatisticsFeatureParams,
  GetTotalStatisticsFeatureResult,
} from './get-total-statistics.types';
import { FinancesRepository } from '../../../database/finances/finance.repository';

@Injectable()
export class GetTotalStatisticsFeature {
  constructor(private readonly financesRepository: FinancesRepository) {}

  async execute(
    params: GetTotalStatisticsFeatureParams,
  ): Promise<GetTotalStatisticsFeatureResult[]> {
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
