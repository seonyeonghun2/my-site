import Knex from 'knex'
const knex = Knex({
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'demouser',
      password: '1234',
      database: 'mysite',
    },
    debug: true
  });
 
  export default knex