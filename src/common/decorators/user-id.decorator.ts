import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const context = gqlContext.getContext().req.user;
    const user = context.req?.user;
    if (!user) {
      throw new Error('User not found in the request context');
    }
    return user.id;
  },
);
