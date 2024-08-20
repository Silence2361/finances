import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FinancesRepository } from '../../../database/repositories/finance.repository';
import {
  DeleteFinanceByIdFeatureParams,
  DeleteFinanceByIdFeatureResult,
} from './delete-finance-by-id.types';

@Injectable()
export class DeleteFinanceByIdFeature {
  constructor(private readonly financesRepository: FinancesRepository) {}

  async execute(
    params: DeleteFinanceByIdFeatureParams,
  ): Promise<DeleteFinanceByIdFeatureResult> {
    const { userId, financeId } = params;
    const finance = await this.financesRepository.findFinanceById(financeId);
    if (!finance) {
      throw new NotFoundException('Finance record not found');
    }
    if (finance.userId !== userId) {
      throw new ForbiddenException();
    }

    await this.financesRepository.deleteFinanceById(financeId);
    return { success: true };
  }
}
