import { Module } from '@nestjs/common';
import { GetUserByIdFeature } from './get-user-by-id.feature';

@Module({
  providers: [GetUserByIdFeature],
  exports: [GetUserByIdFeature],
})
export class GetUserByIdModule {}
