import { Injectable } from '@nestjs/common';
import { FindTotalStatisticsFeatureParams } from './find-total-statistics.types';
import { FinancesRepository } from '../../../database/finances/finance.repository';

@Injectable()
export class FindTotalStatisticsFeature {
  constructor(private readonly financesRepository: FinancesRepository) {}

  async execute(params: FindTotalStatisticsFeatureParams): Promise<any> {
    const { userId } = params;
    return this.financesRepository.findTotalStatistics(userId);
  }
}
