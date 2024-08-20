import { Injectable } from '@nestjs/common';
import { FinancesRepository } from '../../../database/repositories/finance.repository';
import {
  FindFinancesFeatureParams,
  FindFinancesFeatureResult,
} from './find-finances.types';

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
