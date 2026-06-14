import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// A custom PARAMETER decorator. Lets controllers write @User() or @User('name')
// instead of digging into the raw request object. The guard attaches req.user.
export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
