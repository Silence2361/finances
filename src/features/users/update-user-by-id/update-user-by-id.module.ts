import { Module } from '@nestjs/common';
import { UpdateUserByIdFeature } from './update-user-by-id.feature';

@Module({
  providers: [UpdateUserByIdFeature],
  exports: [UpdateUserByIdFeature],
})
export class UpdateUserByIdModule {}
