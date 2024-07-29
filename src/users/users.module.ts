import { Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { User } from './users.model';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';

@Module({
  imports: [ObjectionModule.forFeature([User])],
  providers: [],
  controllers: [],
  exports: [ObjectionModule]
})
export class UsersModule {}
