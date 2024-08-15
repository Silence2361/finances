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
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FinancesService } from './finances.service';
import { FinanceType } from './finances.model';
import { CreateFinanceDto } from './dto/create-finances.dto';
import { UserRequest } from '../users/interfaces/user-request.interface';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { IFinance } from './interfaces/finance.interface';

@ApiTags('finances')
@Controller('finances')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new finance record' })
  @ApiResponse({
    status: 201,
    description: 'Finance record created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @HttpCode(HttpStatus.CREATED)
  async createFinance(
    @Body() createFinanceDto: CreateFinanceDto,
    @Req() req: Request & UserRequest,
  ): Promise<IFinance> {
    return this.financesService.createFinance(createFinanceDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get finance all finances records or get by type' })
  @ApiResponse({
    status: 200,
    description: 'Finance records returned successfully',
  })
  @HttpCode(200)
  async findFinances(
    @Query('type') type: FinanceType,
    @Request() req: UserRequest,
  ): Promise<IFinance[]> {
    return this.financesService.findFinances(req.user.id, type);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a finance record' })
  @ApiResponse({
    status: 200,
    description: 'Finance record updated successfully',
  })
  @HttpCode(200)
  async updateFinanceById(
    @Param('id') id: number,
    @Body() updateFinanceDto: UpdateFinanceDto,
    @Req() req: UserRequest,
  ): Promise<IFinance | null> {
    return this.financesService.updateFinanceById(
      id,
      updateFinanceDto,
      req.user.id,
    );
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
    @Req() req: UserRequest,
  ): Promise<void> {
    await this.financesService.deleteFinanceById(id, req.user.id);
  }

  @Get('statistics/category')
  @ApiOperation({ summary: 'Get statisctics by category' })
  @ApiResponse({ status: 200, description: 'Return statistics by category' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findCategoryStatistics(@Req() req: UserRequest): Promise<any> {
    return this.financesService.findCategoryStatistics(req.user.id);
  }

  @Get('statistics/total')
  @ApiOperation({ summary: 'Get total statisctics' })
  @ApiResponse({ status: 200, description: 'Return total statistics ' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(200)
  async findTotalStatistics(@Req() req: UserRequest): Promise<any> {
    return this.financesService.findTotalStatistics(req.user.id);
  }

  @Get('statistics/monthly')
  @ApiOperation({ summary: 'Get monthly statisctics' })
  @ApiResponse({ status: 200, description: 'Return monthly statistics' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(200)
  async findMonthlyStatistics(
    @Req() req: UserRequest,
    @Query('month') month: number,
    @Query('year') year: number,
  ): Promise<any> {
    return this.financesService.findMonthlyStatistics(req.user.id, month, year);
  }
}
