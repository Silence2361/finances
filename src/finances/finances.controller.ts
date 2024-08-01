import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { FinanceType } from './finances.model';
import { CreateFinanceDto } from './dto/create.finances.dto';
import { UserRequest } from '../auth/interfaces/user-request.interface';
import { JwtAuthGuard } from '../auth/JwtAuthGuard/jwt-auth.guard';
import { IUser } from '../users/interfaces/user.interface';
import {  ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateFinanceDto } from './dto/update.finance.dto';


@ApiTags('finances')
@Controller('finances')
export class FinancesController {

    constructor(private readonly financesService: FinancesService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new finance record' })
    @ApiResponse({ status: 201, description: 'Finance record created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async addFinance(@Body() createFinanceDto: CreateFinanceDto, @Req() req: Request & UserRequest) {
        const userId = req.user.id;
        return this.financesService.addFinance(createFinanceDto, userId);
  }

    


    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Get finance all finances records or get by type' })
    @ApiResponse({ status: 200, description: 'Finance records returned successfully' })
    async getFinances(@Query('type') type: FinanceType, @Request() req: UserRequest) {
        const userId = req.user.id;
        console.log('Request user:', req.user);  
        console.log('Query type:', type);
        return this.financesService.getFinances(userId, type);
  }
      

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Update a finance record' })
    @ApiResponse({ status: 200, description: 'Finance record updated successfully' })
    async updateFinance(@Param('id') id: string, @Body() updateFinanceDto: UpdateFinanceDto, @Req() req: UserRequest ){
        console.log('Request user:', req.user); 
        const userId = req.user.id;
        return this.financesService.updateFinance(+id, updateFinanceDto, userId)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a finance record' })
    @ApiResponse({ status: 200, description: 'Finance record deleted successfully' })
    async removeFinance(@Param('id') id: string, @Req() req: UserRequest){
        console.log('Deleting finance for user:', req.user);
        const userId = req.user.id
        await this.financesService.removeFinance(+id, userId);
        return { message: 'Finance record deleted successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('statistics/category')
    @ApiOperation({summary: 'Get statisctics by category'})
    @ApiResponse({status: 200, description: 'Return statistics by category'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    async getCategoryStatistics(@Req() req: UserRequest){
        const userId = req.user.id
        return this.financesService.getCategoryStatistics(userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get('statistics/total')
    @ApiOperation({summary: 'Get total statisctics'})
    @ApiResponse({status: 200, description: 'Return total statistics '})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    async getTotalStatistics(@Req() req: UserRequest){
        const userId = req.user.id
        return this.financesService.getTotalStatistics(userId)
    }   

    @UseGuards(JwtAuthGuard)
    @Get('statistics/monthly')
    @ApiOperation({summary: 'Get monthly statisctics'})
    @ApiResponse({status: 200, description: 'Return monthly statistics'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    async getMonthlyStatistics(@Req() req: UserRequest, @Query('month') month: number, @Query('year') year: number){
        const userId = req.user.id
        return this.financesService.getMonthlyStatistics(userId, month,year)
    }
}