import { Module } from '@nestjs/common';
import { RedisModule } from '../../../third-party/config/redis.module';
import { RefreshTokenHandlerFeature } from './refresh-token-handler.feature';

@Module({
  imports: [RedisModule],
  providers: [RefreshTokenHandlerFeature],
  exports: [RefreshTokenHandlerFeature],
})
export class RefreshTokenModule {}
