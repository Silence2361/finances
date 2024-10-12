import { Module } from '@nestjs/common';
import { CreateUserModule } from './users/create-user/create-user.module';
import { GetUsersModule } from './users/get-users/get-users.module';
import { GetUserByIdModule } from './users/get-user-by-id/get-user-by-id.module';
import { DeleteUserByIdModule } from './users/delete-user-by-id/delete-user-by-id.module';
import { CreateCategoryModule } from './categories/create-category/create-category.module';
import { UpdateCategoryByIdModule } from './categories/update-category-by-id/update-category-by-id.module';
import { GetCategoriesModule } from './categories/get-categories/get-categories.module';
import { GetCategoryByIdModule } from './categories/get-category-by-id/get-category-by-id.module';
import { DeleteCategoryByIdModule } from './categories/delete-category-by-id/delete-category-by-id.module';
import { CreateFinanceModule } from './finances/create-finance/create-finance.module';
import { UpdateFinanceByIdModule } from './finances/update-finance-by-id/update-finance-by-id.module';
import { DeleteFinanceByIdModule } from './finances/delete-finance-by-id/delete-finance-by-id.module';
import { FindFinancesModule } from './finances/get-finances/get-finances.module';
import { GetCategoryStatisticsModule } from './finances/get-category-statistics/get-category-statistics.module';
import { GetTotalStatisticsModule } from './finances/get-total-statistics/get-total-statistics.module';
import { GetMonthlyStatisticsModule } from './finances/get-monthly-statistics/get-monthly-statistics.module';
import { UpdateUserByIdModule } from './users/update-user-by-id/update-user-by-id.module';
import { RegisterUserModule } from './auth/register-user/register-user.module';
import { LoginUserModule } from './auth/login-user/login-user.module';
import { GenerateTokenModule } from './auth/generate-refresh-token/refresh-token.module';
import { RefreshTokenModule } from './auth/refresh-token/refresh-token.module';
import { MailerFeatureModule } from './auth/send-activation/send-activation.module';
import { ResendActivationCodeModule } from './auth/resend-activation-code/resend-activation-code.module';
import { SendPasswordResetCodeModule } from './auth/send-password-reset-code/send-password-reset-code.module';
import { ResetPasswordModule } from './auth/reset-password/reset-password.module';

@Module({
  imports: [
    CreateUserModule,
    UpdateUserByIdModule,
    GetUsersModule,
    GetUserByIdModule,
    DeleteUserByIdModule,
    CreateCategoryModule,
    UpdateCategoryByIdModule,
    GetCategoriesModule,
    GetCategoryByIdModule,
    DeleteCategoryByIdModule,
    CreateFinanceModule,
    UpdateFinanceByIdModule,
    DeleteFinanceByIdModule,
    FindFinancesModule,
    GetCategoryStatisticsModule,
    GetTotalStatisticsModule,
    GetMonthlyStatisticsModule,
    RegisterUserModule,
    LoginUserModule,
    GenerateTokenModule,
    RefreshTokenModule,
    MailerFeatureModule,
    ResendActivationCodeModule,
    SendPasswordResetCodeModule,
    ResetPasswordModule,
  ],
  exports: [
    CreateUserModule,
    UpdateUserByIdModule,
    GetUsersModule,
    GetUserByIdModule,
    DeleteUserByIdModule,
    CreateCategoryModule,
    UpdateCategoryByIdModule,
    GetCategoriesModule,
    GetCategoryByIdModule,
    DeleteCategoryByIdModule,
    CreateFinanceModule,
    UpdateFinanceByIdModule,
    DeleteFinanceByIdModule,
    FindFinancesModule,
    GetCategoryStatisticsModule,
    GetTotalStatisticsModule,
    GetMonthlyStatisticsModule,
    RegisterUserModule,
    LoginUserModule,
    GenerateTokenModule,
    RefreshTokenModule,
    MailerFeatureModule,
    ResendActivationCodeModule,
    SendPasswordResetCodeModule,
    ResetPasswordModule,
  ],
})
export class FeaturesModule {}
