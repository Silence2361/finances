import { Injectable } from '@nestjs/common';
import { FinancesRepository } from '../../../database/repositories/finance.repository';
import { FindTotalStatisticsFeatureParams } from './find-total-statistics.types';

@Injectable()
export class FindTotalStatisticsFeature {
  constructor(private readonly financesRepository: FinancesRepository) {}

  async execute(params: FindTotalStatisticsFeatureParams): Promise<any> {
    const { userId } = params;
    return this.financesRepository.findTotalStatistics(userId);
  }
}
