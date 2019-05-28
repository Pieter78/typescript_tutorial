import { testConn } from '../../../test-utils/testConn'
import { Connection } from 'typeorm'
import { gCall } from '../../../test-utils/gCall'

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
    console.log(
      await gCall({
        source: registerMutation,
        variableValues: {
          data: {
            firstName: 'Bob',
            lastName: 'Rob',
            email: 'bob2@test.com',
            password: '123456',
          },
        },
      }),
    )
  })
})
