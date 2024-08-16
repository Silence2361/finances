import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FinancesService } from './finances.service';
import { CreateFinanceDto } from './dto/create-finances.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { CreateFinanceResponseDto } from './dto/create-finance-response.dto';
import { FindFinancesQueryDto } from './dto/find-finances-query.dto';
import { UpdateFinanceResponseDto } from './dto/update-finance-response.dto';
import {
  CategoryStatisticsResponseDto,
  MonthlyStatisticsResponseDto,
  TotalStatisticsResponseDto,
} from './dto/statistics-response.dto';
import { FindFinancesListResponseDto } from './dto/find-finances-list-response.dto';
import { UserId } from '../common/decorators/user-id.decorator';

@ApiTags('finances')
@Controller('finances')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new finance record' })
  @ApiOkResponse({ type: CreateFinanceResponseDto })
  @ApiResponse({
    status: 201,
    description: 'Finance record created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @HttpCode(HttpStatus.CREATED)
  async createFinance(
    @Body() createFinanceDto: CreateFinanceDto,
    @UserId() userId: number,
  ): Promise<CreateFinanceResponseDto> {
    return this.financesService.createFinance(createFinanceDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get finance all finances records or get by type' })
  @ApiOkResponse({ type: FindFinancesListResponseDto })
  @ApiResponse({
    status: 200,
    description: 'Finance records returned successfully',
  })
  async findFinances(
    @Query() query: FindFinancesQueryDto,
    @UserId() userId: number,
  ): Promise<FindFinancesListResponseDto> {
    return this.financesService.findFinances(userId, query?.type);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a finance record' })
  @ApiOkResponse({ type: UpdateFinanceResponseDto })
  @ApiResponse({
    status: 200,
    description: 'Finance record updated successfully',
  })
  async updateFinanceById(
    @Param('id') id: number,
    @Body() updateFinanceDto: UpdateFinanceDto,
    @UserId() userId: number,
  ): Promise<UpdateFinanceResponseDto | null> {
    return this.financesService.updateFinanceById(id, updateFinanceDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a finance record' })
  @ApiResponse({
    status: 204,
    description: 'Finance record deleted successfully',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFinanceById(
    @Param('id') id: number,
    @UserId() userId: number,
  ): Promise<void> {
    await this.financesService.deleteFinanceById(id, userId);
  }

  @Get('statistics/category')
  @ApiOperation({ summary: 'Get statisctics by category' })
  @ApiOkResponse({ type: CategoryStatisticsResponseDto })
  @ApiResponse({ status: 200, description: 'Return statistics by category' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findCategoryStatistics(
    @UserId() userId: number,
  ): Promise<CategoryStatisticsResponseDto> {
    return this.financesService.findCategoryStatistics(userId);
  }

  @Get('statistics/total')
  @ApiOperation({ summary: 'Get total statisctics' })
  @ApiOkResponse({ type: TotalStatisticsResponseDto })
  @ApiResponse({ status: 200, description: 'Return total statistics ' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findTotalStatistics(
    @UserId() userId: number,
  ): Promise<TotalStatisticsResponseDto> {
    return this.financesService.findTotalStatistics(userId);
  }

  @Get('statistics/monthly')
  @ApiOperation({ summary: 'Get monthly statisctics' })
  @ApiOkResponse({ type: MonthlyStatisticsResponseDto })
  @ApiResponse({ status: 200, description: 'Return monthly statistics' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findMonthlyStatistics(
    @UserId() userId: number,
    @Query('month') month: number,
    @Query('year') year: number,
  ): Promise<MonthlyStatisticsResponseDto> {
    return this.financesService.findMonthlyStatistics(userId, month, year);
  }
}
