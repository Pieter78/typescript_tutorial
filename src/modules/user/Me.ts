import { MyContext } from 'src/types/MyContext'
import { User } from './../../entity/User'
import { Resolver, Query, Ctx } from 'type-graphql'

@Resolver(User)
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined
    }

    return User.findOne(ctx.req.session!.userId)
  }
}
