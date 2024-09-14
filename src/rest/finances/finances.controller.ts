import { UseGuards } from '@nestjs/common';
import { CreateFinanceDto } from './dto/create-finances.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { CreateFinanceResponseDto } from './dto/create-finance-response.dto';
import { UserId } from '../../common/decorators/user-id.decorator';
import { CreateFinanceFeature } from '../../features/finances/create-finance/create-finance.feature';
import { UpdateFinanceByIdFeature } from '../../features/finances/update-finance-by-id/update-finance-by-id.feature';
import { DeleteFinanceByIdFeature } from '../../features/finances/delete-finance-by-id/delete-finance-by-id.feature';
import { GetFinancesFeature } from '../../features/finances/get-finances/get-finances.feature';
import { GetCategoryStatisticsFeature } from '../../features/finances/get-category-statistics/get-category-statistics.feature';
import { GetTotalStatisticsFeature } from '../../features/finances/get-total-statistics/get-total-statistics.feature';
import { StatisticsResponseDto } from './dto/statistics-response.dto';
import { GetMonthlyStatisticsFeature } from '../../features/finances/get-monthly-statistics/get-monthly-statistics.feature';
import { FinancesPaginationQueryDto } from './dto/pagination-query.dto';
import { GetFinancesListResponseDto } from './dto/find-finances-list-response.dto';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../third-party/jwt/jwt-auth.guard';

@Resolver()
@UseGuards(JwtAuthGuard)
export class FinancesResolver {
  constructor(
    private readonly createFinanceFeature: CreateFinanceFeature,
    private readonly updateFinanceByIdFeature: UpdateFinanceByIdFeature,
    private readonly findFinancesFeature: GetFinancesFeature,
    private readonly deleteFinanceByIdFeature: DeleteFinanceByIdFeature,
    private readonly GetCategoryStatisticsFeature: GetCategoryStatisticsFeature,
    private readonly findTotalStatisticsFeature: GetTotalStatisticsFeature,
    private readonly findMonthlyStatisticsFeature: GetMonthlyStatisticsFeature,
  ) {}

  @Mutation(() => CreateFinanceResponseDto)
  async createFinance(
    @Args('createFinanceDto') createFinanceDto: CreateFinanceDto,
    @UserId() userId: number,
  ): Promise<CreateFinanceResponseDto> {
    return this.createFinanceFeature.execute({ ...createFinanceDto, userId });
  }

  @Query(() => GetFinancesListResponseDto)
  async findFinances(
    @Args() paginationQuery: FinancesPaginationQueryDto,
    @UserId() userId: number,
  ): Promise<GetFinancesListResponseDto> {
    return this.findFinancesFeature.execute(userId, paginationQuery);
  }

  @Mutation(() => Boolean)
  async updateFinanceById(
    @Args('id', { type: () => Int }) financeId: number,
    @Args('updateFinanceDto') updateFinanceDto: UpdateFinanceDto,
    @UserId() userId: number,
  ): Promise<Boolean> {
    await this.updateFinanceByIdFeature.execute(financeId, {
      ...updateFinanceDto,
      userId,
    });
    return true;
  }

  @Mutation(() => Boolean)
  async deleteFinanceById(
    @Args('id', { type: () => Int }) financeId: number,
    @UserId() userId: number,
  ): Promise<Boolean> {
    await this.deleteFinanceByIdFeature.execute({ financeId, userId });
    return true;
  }

  @Query(() => [StatisticsResponseDto])
  async findCategoryStatistics(
    @UserId() userId: number,
  ): Promise<StatisticsResponseDto[]> {
    return this.GetCategoryStatisticsFeature.execute({ userId });
  }

  @Query(() => [StatisticsResponseDto])
  async findTotalStatistics(
    @UserId() userId: number,
  ): Promise<StatisticsResponseDto[]> {
    return this.findTotalStatisticsFeature.execute({ userId });
  }

  @Query(() => [StatisticsResponseDto])
  async findMonthlyStatistics(
    @UserId() userId: number,
    @Args('month', { type: () => Int }) month: number,
    @Args('year', { type: () => Int }) year: number,
  ): Promise<StatisticsResponseDto[]> {
    return this.findMonthlyStatisticsFeature.execute({ userId, month, year });
  }
}
