import { Module } from '@nestjs/common';
import { GetUsersFeature } from './get-users.feature';

@Module({
  providers: [GetUsersFeature],
  exports: [GetUsersFeature],
})
export class GetUsersModule {}
