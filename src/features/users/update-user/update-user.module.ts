import { Module } from '@nestjs/common';
import { UpdateUserFeature } from './update-user.feature';

@Module({
  providers: [UpdateUserFeature],
  exports: [UpdateUserFeature],
})
export class UpdateUserModule {}
