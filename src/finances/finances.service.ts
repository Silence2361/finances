import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { Finance, FinanceType } from './finances.model';
import { ModelClass } from 'objection';
import { CreateFinanceDto } from './dto/create.finances.dto';
import { UpdateFinanceDto } from './dto/update.finance.dto';

@Injectable()
export class FinancesService {

    constructor(@InjectModel(Finance) private readonly financeModel: ModelClass<Finance>){}

    async addFinance(createFinanceDto: CreateFinanceDto, userId: number): Promise<Finance>{
        const finance = {
            ...createFinanceDto,
            user_id: userId,
            category_id: createFinanceDto.category_id,
            date: new Date(createFinanceDto.date).toISOString()
        };
        return this.financeModel.query().insert(finance)
    }

    
    async getFinances(userId: number, type?: FinanceType): Promise<Finance[]> {
        const query = this.financeModel.query().where({ user_id: userId })
        .withGraphFetched('category');
        if (type) {
          query.where('type', type);
        }
        return query;
      }

    async updateFinance(id: number, updateFinanceDto: UpdateFinanceDto, userId: number): Promise<Finance>{
        const finance = await this.financeModel.query().findById(id)
        if (!finance) {
            throw new NotFoundException('Finance record not found');
        }
        if (finance.user_id !== userId) {
            throw new UnauthorizedException();
        }
        return this.financeModel.query().patchAndFetchById(id, {
            ...updateFinanceDto, // глянуть
            user_id: userId,
            date: updateFinanceDto.date ? new Date(updateFinanceDto.date).toISOString() : finance.date,
        })
         .withGraphFetched('category');
    }

    async removeFinance(id: number, userId: number): Promise<void>{
        const finance = await this.financeModel.query().findById(id)
        if (!finance) {
            throw new NotFoundException('Finance record not found');
        }
        if (finance.user_id !== userId) {
            throw new UnauthorizedException();
        }
        await this.financeModel.query().deleteById(id).where({user_id: userId});
    }

    async getCategoryStatistics(userId: number){
        return this.financeModel.query()
            .select('category_id')
            .sum('amount as totalAmount')
            .where('user_id', userId)
            .groupBy('category_id')
    }

    async getTotalStatistics(userId: number){
        return this.financeModel.query()
            .sum('amount as totalAmount')
            .where('user_id', userId)
            .first()
    }
}
