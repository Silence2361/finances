import { PartialType } from '@nestjs/swagger';
import { CreateFinanceDto } from './create.finances.dto';

export class UpdateFinanceDto extends PartialType(CreateFinanceDto) {}
