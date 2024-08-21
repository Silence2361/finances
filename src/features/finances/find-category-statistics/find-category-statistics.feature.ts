import { Injectable } from '@nestjs/common';
import { FindCategoryStatisticsFeatureParams } from './find-category-statistics.types';
import { FinancesRepository } from '../../../database/finances/finance.repository';

@Injectable()
export class FindCategoryStatisticsFeature {
  constructor(private readonly financesRepository: FinancesRepository) {}

  async execute(params: FindCategoryStatisticsFeatureParams): Promise<any> {
    const { userId } = params;
    return this.financesRepository.findCategoryStatistics(userId);
  }
}
