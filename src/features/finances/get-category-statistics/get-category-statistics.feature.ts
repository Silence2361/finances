import { Injectable } from '@nestjs/common';
import {
  GetCategoryStatisticsFeatureParams,
  GetCategoryStatisticsFeatureResult,
} from './get-category-statistics.types';
import { FinancesRepository } from '../../../database/finances/finance.repository';
import { ICategoryStatistics } from '../../../database/finances/finance.interface';

@Injectable()
export class GetCategoryStatisticsFeature {
  constructor(private readonly financesRepository: FinancesRepository) {}

  async execute(
    params: GetCategoryStatisticsFeatureParams,
  ): Promise<GetCategoryStatisticsFeatureResult[]> {
    const { userId } = params;

    const statistics: ICategoryStatistics[] =
      await this.financesRepository.findCategoryStatistics(userId);

    return statistics.map((stat) => ({
      categoryId: stat.categoryId,
      totalAmount: stat.totalAmount,
      type: stat.type,
      category: {
        id: stat.category.id,
        name: stat.category.name,
      },
    }));
  }
}
