import { forgotPasswordPrefix } from './../constants/redisPrefixes'
import { v4 } from 'uuid'
import { Resolver, Mutation, Arg } from 'type-graphql'
import { sendEmail } from '../utils/sendEmail'
import { redis } from '../../redis'
import { User } from '../../entity/User'

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return true
    }

    const token = v4()
    await redis.set(forgotPasswordPrefix + token, user.id, 'ex', 60 * 60 * 24)

    await sendEmail(email, `http://localhost:3000/user/confirm/change-password/${token}`)

    return true
  }
}
