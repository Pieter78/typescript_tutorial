import { testConn } from '../../../test-utils/testConn'
import { Connection } from 'typeorm'
import { gCall } from '../../../test-utils/gCall'
import faker from 'faker'
import { User } from '../../../entity/User'

let connection: Connection

beforeAll(async () => {
  connection = await testConn()
})

afterAll(async () => {
  await connection.close()
})

const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
  }
}
`

describe('Register', () => {
  it('creates a user', async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    console.log(user)

    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    })

    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    })

    const dbUser = await User.findOne({ where: { email: user.email } })
    expect(dbUser).toBeDefined()
    expect(dbUser!.confirmed).toBeFalsy()
    expect(dbUser!.firstName).toBe(user.firstName)
  })
})
