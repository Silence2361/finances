import { Module } from '@nestjs/common';
import { RedisModule } from '../../../third-party/config/redis.module';
import { GenerateTokenHandlerFeature } from './refresh-token.feature';

@Module({
  imports: [RedisModule],
  providers: [GenerateTokenHandlerFeature],
  exports: [GenerateTokenHandlerFeature],
})
export class GenerateTokenModule {}
