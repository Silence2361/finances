import { Module } from '@nestjs/common';
import { DeleteUserByIdFeature } from './delete-user-by-id.feature';

@Module({
  providers: [DeleteUserByIdFeature],
  exports: [DeleteUserByIdFeature],
})
export class DeleteUserByIdModule {}
