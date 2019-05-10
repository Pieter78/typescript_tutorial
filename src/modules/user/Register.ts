import { logger } from './../middleware/logger'
import { User } from './../../entity/User'
import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { RegisterInput } from './register/RegisterInput'
import { isAuth } from '../middleware/isAuth'
import { sendEmail } from '../utils/sendEmail'
import { createConfirmationUrl } from '../utils/createConfirmationUrl'

@Resolver(User)
export class RegisterResolver {
  @UseMiddleware(isAuth, logger)
  @Query(() => String, { name: 'helloWorld' })
  async hello() {
    return 'Hello World!'
  }

  @Mutation(() => User)
  async register(@Arg('data')
  {
    email,
    firstName,
    lastName,
    password,
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save()

    await sendEmail(email, await createConfirmationUrl(user.id))

    return user
  }
}
