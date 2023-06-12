import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest()

    if (!data) return request.user
    return request.user[data]
  }
)
