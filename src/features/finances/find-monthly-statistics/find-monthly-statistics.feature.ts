import { Injectable } from '@nestjs/common';
import { FinancesRepository } from '../../../database/repositories/finance.repository';
import { FindMonthlyStatisticsFeatureParams } from './find-monthly-statistics.types';

@Injectable()
export class FindMonthlyStatisticsFeature {
  constructor(private readonly financesRepository: FinancesRepository) {}

  async execute(params: FindMonthlyStatisticsFeatureParams): Promise<any> {
    const { userId, month, year } = params;
    return this.financesRepository.findMonthlyStatistics(userId, month, year);
  }
}
