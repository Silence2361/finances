import { Injectable } from '@nestjs/common';
import {
  FindFinancesFeatureParams,
  FindFinancesFeatureResult,
} from './find-finances.types';
import { FinancesRepository } from '../../../database/finances/finance.repository';

@Injectable()
export class FindFinancesFeature {
  constructor(private readonly financesRepository: FinancesRepository) {}

  async execute(
    params: FindFinancesFeatureParams,
  ): Promise<FindFinancesFeatureResult> {
    const { type, userId } = params;
    const finances = await this.financesRepository.findFinances(userId, type);
    return { finances };
  }
}
