import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection';
import { ModelClass } from 'objection';
import { UpdateFinanceDto } from '../finances/dto/update-finance.dto';
import {
  ICreateFinance,
  IFinance,
} from '../finances/interfaces/finance.interface';
import { Finance } from '../finances/finances.model';

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

  async findFinanceById(id: number): Promise<IFinance | null> {
    const finance: IFinance | null = await this.financeModel
      .query()
      .findById(id)
      .withGraphFetched('category');
    return finance;
  }

  async updateFinanceById(
    id: number,
    updateFinanceDto: UpdateFinanceDto,
  ): Promise<IFinance | null> {
    const finance: IFinance | null = await this.financeModel
      .query()
      .patchAndFetchById(id, updateFinanceDto)
      .withGraphFetched('category');
    return finance;
  }

  async deleteFinanceById(id: number): Promise<void> {
    await this.financeModel.query().deleteById(id);
  }

  async findCategoryStatistics(userId: number): Promise<any> {
    return this.financeModel
      .query()
      .select('category_id')
      .sum('amount as totalAmount')
      .where('user_id', userId)
      .groupBy('category_id')
      .withGraphFetched('category');
  }

  async findTotalStatistics(userId: number): Promise<any> {
    return this.financeModel
      .query()
      .select('type')
      .sum('amount as total')
      .where('user_id', userId)
      .groupBy('type');
  }

  async findMonthlyStatistics(
    userId: number,
    month: number,
    year: number,
  ): Promise<any> {
    return this.financeModel
      .query()
      .select('type')
      .sum('amount as total')
      .where('user_id', userId)
      .andWhereRaw('EXTRACT(MONTH FROM date) = ?', [month])
      .andWhereRaw('EXTRACT(YEAR FROM date) = ?', [year])
      .groupBy('type');
  }
}
