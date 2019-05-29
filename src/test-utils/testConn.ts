import { createConnection } from 'typeorm'

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: '',
    type: 'postgres',
    host: '',
    port: 5432,
    username: '',
    password: '',
    database: '',
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + '/../entity/*.*'],
    extra: {
      ssl: true,
    },
  })
}
