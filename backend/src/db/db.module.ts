// import { Module } from '@nestjs/common';
// import { DataSource } from 'typeorm';
import { createConnection } from 'mysql2';

// @Module({
//   imports: [],
//   controllers: [],
//   providers: [],
// })
// export class DbModule {}

// const MySQLDataSource = new DataSource({
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// const MySQLDataSourceInit = MySQLDataSource.initialize();

// export async function MakeQuery(query: string) {
//   const result = await MySQLDataSourceInit.then((res) => {
//     return res.createQueryRunner().manager.query(query);
//   }).catch((err) => {
//     return err;
//   });

//   return result;
// }

export default createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
