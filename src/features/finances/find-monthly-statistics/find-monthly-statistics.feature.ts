import { Injectable } from '@nestjs/common';
import { FindMonthlyStatisticsFeatureParams } from './find-monthly-statistics.types';
import { FinancesRepository } from '../../../database/finances/finance.repository';

@Injectable()
export class FindMonthlyStatisticsFeature {
  constructor(private readonly financesRepository: FinancesRepository) {}

  async execute(params: FindMonthlyStatisticsFeatureParams): Promise<any> {
    const { userId, month, year } = params;
    return this.financesRepository.findMonthlyStatistics(userId, month, year);
  }
}
