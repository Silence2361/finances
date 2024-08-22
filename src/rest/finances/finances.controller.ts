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
import { CreateFinanceDto } from './dto/create-finances.dto';
import { JwtAuthGuard } from '../../third-party/jwt/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { CreateFinanceResponseDto } from './dto/create-finance-response.dto';
import { UserId } from '../../common/decorators/user-id.decorator';
import { CreateFinanceFeature } from '../../features/finances/create-finance/create-finance.feature';
import { UpdateFinanceByIdFeature } from '../../features/finances/update-finance-by-id/update-finance-by-id.feature';
import { DeleteFinanceByIdFeature } from '../../features/finances/delete-finance-by-id/delete-finance-by-id.feature';
import { FindFinancesFeature } from '../../features/finances/find-finances/find-finances.feature';
import { FindCategoryStatisticsFeature } from '../../features/finances/find-category-statistics/find-category-statistics.feature';
import { FindTotalStatisticsFeature } from '../../features/finances/find-total-statistics/find-total-statistics.feature';
import { StatisticsResponseDto } from './dto/statistics-response.dto';
import { FindMonthlyStatisticsFeature } from '../../features/finances/find-monthly-statistics/find-monthly-statistics.feature';
import { FinancesPaginationQueryDto } from './dto/pagination-query.dto';
import { GetFinancesListResponseDto } from './dto/find-finances-list-response.dto';

@ApiTags('finances')
@Controller('finances')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Unauthorized' })
export class FinancesController {
  constructor(
    private readonly createFinanceFeature: CreateFinanceFeature,
    private readonly updateFinanceByIdFeature: UpdateFinanceByIdFeature,
    private readonly findFinancesFeature: FindFinancesFeature,
    private readonly deleteFinanceByIdFeature: DeleteFinanceByIdFeature,
    private readonly findCategoryStatisticsFeature: FindCategoryStatisticsFeature,
    private readonly findTotalStatisticsFeature: FindTotalStatisticsFeature,
    private readonly findMonthlyStatisticsFeature: FindMonthlyStatisticsFeature,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new finance record' })
  @ApiCreatedResponse({ type: CreateFinanceResponseDto })
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
    return this.createFinanceFeature.execute({ ...createFinanceDto, userId });
  }

  @Get()
  @ApiOperation({ summary: 'Get finance all finances records or get by type' })
  @ApiOkResponse({ type: GetFinancesListResponseDto })
  @ApiResponse({
    status: 200,
    description: 'Finance records returned successfully',
  })
  async findFinances(
    @Query() query: FinancesPaginationQueryDto,
    @UserId() userId: number,
  ): Promise<GetFinancesListResponseDto> {
    return this.findFinancesFeature.execute(userId, query);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a finance record' })
  @ApiOkResponse()
  @ApiResponse({
    status: 200,
    description: 'Finance record updated successfully',
  })
  async updateFinanceById(
    @Param('id') financeId: number,
    @Body() updateFinanceDto: UpdateFinanceDto,
    @UserId() userId: number,
  ): Promise<void> {
    await this.updateFinanceByIdFeature.execute(financeId, {
      ...updateFinanceDto,
      userId,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a finance record' })
  @ApiResponse({
    status: 204,
    description: 'Finance record deleted successfully',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFinanceById(
    @Param('id') financeId: number,
    @UserId() userId: number,
  ): Promise<void> {
    await this.deleteFinanceByIdFeature.execute({ financeId, userId });
  }

  @Get('statistics/category')
  @ApiOperation({ summary: 'Get statisctics by category' })
  @ApiOkResponse({ type: StatisticsResponseDto })
  @ApiResponse({ status: 200, description: 'Return statistics by category' })
  async findCategoryStatistics(
    @UserId() userId: number,
  ): Promise<StatisticsResponseDto[]> {
    return this.findCategoryStatisticsFeature.execute({ userId });
  }

  @Get('statistics/total')
  @ApiOperation({ summary: 'Get total statisctics' })
  @ApiOkResponse({ type: StatisticsResponseDto })
  @ApiResponse({ status: 200, description: 'Return total statistics ' })
  async findTotalStatistics(
    @UserId() userId: number,
  ): Promise<StatisticsResponseDto[]> {
    return this.findTotalStatisticsFeature.execute({ userId });
  }

  @Get('statistics/monthly')
  @ApiOperation({ summary: 'Get monthly statisctics' })
  @ApiOkResponse({ type: StatisticsResponseDto })
  @ApiResponse({ status: 200, description: 'Return monthly statistics' })
  async findMonthlyStatistics(
    @UserId() userId: number,
    @Query('month') month: number,
    @Query('year') year: number,
  ): Promise<StatisticsResponseDto[]> {
    return this.findMonthlyStatisticsFeature.execute({ userId, month, year });
  }
}
