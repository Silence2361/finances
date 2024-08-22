import { Injectable } from '@nestjs/common';
import {
  GetFinancesFeatureParams,
  GetFinancesFeatureResult,
} from './get-finances.types';
import { FinancesRepository } from '../../../database/finances/finance.repository';
import { IFinance } from '../../../database/finances/finance.interface';

@Injectable()
export class GetFinancesFeature {
  constructor(private readonly financesRepository: FinancesRepository) {}

  async execute(
    userId: number,
    params: GetFinancesFeatureParams,
  ): Promise<GetFinancesFeatureResult> {
    const { page = 1, pageSize = 10, type } = params;

    const offset = (page - 1) * pageSize;

    const paginationOptions = {
      offset,
      limit: pageSize,
    };

    const finances: IFinance[] = await this.financesRepository.findFinances(
      userId,
      paginationOptions,
      type,
    );

    const count = await this.financesRepository.financesCount();
    return {
      docs: finances.map(({ id, type, amount, categoryId, userId, date }) => ({
        id,
        type,
        amount,
        categoryId,
        userId,
        date,
      })),
      count,
    };
  }
}
