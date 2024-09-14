import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  USER = 'user',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
