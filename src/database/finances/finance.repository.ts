import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection';
import { ModelClass } from 'objection';
import {
  ICategoryStatistics,
  ICreateFinance,
  IFinance,
  IMonthlyStatistics,
  ITotalStatistics,
  IUpdateFinance,
} from './finance.interface';
import { Finance } from '../finances/finances.model';
import { castTo } from '../../common/utils/type-utils';
import { FindTotalStatisticsFeatureResult } from '../../features/finances/find-total-statistics/find-total-statistics.types';

@Injectable()
export class FinancesRepository {
  constructor(
    @InjectModel(Finance) private readonly financeModel: ModelClass<Finance>,
  ) {}

  async createFinance(createFinance: ICreateFinance): Promise<IFinance> {
    const newFinance: IFinance = await this.financeModel
      .query()
      .insert(createFinance);
    return newFinance;
  }

  async findFinances(userId: number, type?: string): Promise<IFinance[]> {
    const query = this.financeModel
      .query()
      .where({ userId: userId })
      .withGraphFetched('category');

    if (type) {
      query.where({ type });
    }

    return query;
  }

  async findFinanceById(financeId: number): Promise<IFinance | null> {
    const finance: IFinance | null = await this.financeModel
      .query()
      .findById(financeId)
      .withGraphFetched('category');
    return finance;
  }

  async updateFinanceById(
    financeId: number,
    updateFinance: IUpdateFinance,
  ): Promise<void> {
    await this.financeModel
      .query()
      .patchAndFetchById(financeId, updateFinance)
      .withGraphFetched('category');
  }

  async deleteFinanceById(financeId: number): Promise<void> {
    await this.financeModel.query().deleteById(financeId);
  }

  async findCategoryStatistics(userId: number): Promise<ICategoryStatistics[]> {
    return this.financeModel
      .query()
      .select('categoryId')
      .sum('amount as totalAmount')
      .where('userId', userId)
      .groupBy('categoryId')
      .withGraphFetched('category')
      .castTo<ICategoryStatistics[]>();
  }

  async findTotalStatistics(userId: number): Promise<ITotalStatistics[]> {
    const result = await this.financeModel
      .query()
      .select('type')
      .sum('amount as totalAmount')
      .where('userId', userId)
      .groupBy('type');

    return castTo<ITotalStatistics[]>(result);
  }

  async findMonthlyStatistics(
    userId: number,
    month: number,
    year: number,
  ): Promise<IMonthlyStatistics[]> {
    const result = await this.financeModel
      .query()
      .select('type')
      .sum('amount as totalAmount')
      .where('userId', userId)
      .andWhereRaw('EXTRACT(MONTH FROM date) = ?', [month])
      .andWhereRaw('EXTRACT(YEAR FROM date) = ?', [year])
      .groupBy('type');

    return castTo<IMonthlyStatistics[]>(result);
  }
}
