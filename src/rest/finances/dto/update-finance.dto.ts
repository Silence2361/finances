import { InputType, PartialType } from '@nestjs/graphql';
import { CreateFinanceDto } from './create-finances.dto';

@InputType()
export class UpdateFinanceDto extends PartialType(CreateFinanceDto) {}
