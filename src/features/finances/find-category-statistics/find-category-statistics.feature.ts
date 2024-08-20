import { Injectable } from '@nestjs/common';
import { FinancesRepository } from '../../../database/repositories/finance.repository';
import { FindCategoryStatisticsFeatureParams } from './find-category-statistics.types';

@Injectable()
export class FindCategoryStatisticsFeature {
  constructor(private readonly financesRepository: FinancesRepository) {}

  async execute(params: FindCategoryStatisticsFeatureParams): Promise<any> {
    const { userId } = params;
    return this.financesRepository.findCategoryStatistics(userId);
  }
}
