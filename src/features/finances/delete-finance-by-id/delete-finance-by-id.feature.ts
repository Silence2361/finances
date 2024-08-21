import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeleteFinanceByIdFeatureParams } from './delete-finance-by-id.types';
import { FinancesRepository } from '../../../database/finances/finance.repository';

@Injectable()
export class DeleteFinanceByIdFeature {
  constructor(private readonly financesRepository: FinancesRepository) {}

  async execute(params: DeleteFinanceByIdFeatureParams): Promise<void> {
    const { userId, financeId } = params;
    const finance = await this.financesRepository.findFinanceById(financeId);
    if (!finance) {
      throw new NotFoundException('Finance record not found');
    }
    if (finance.userId !== userId) {
      throw new ForbiddenException();
    }

    await this.financesRepository.deleteFinanceById(financeId);
  }
}
