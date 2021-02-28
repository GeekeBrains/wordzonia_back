import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

// mongodb+srv://wordzonia:uMfvf5Vj52ZtGcfg@cluster0.vy6cw.mongodb.net/test?authSource=admin&replicaSet=atlas-8h75a4-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true
// "loopback-test": {
//     "connector": "mongodb",
//     "name": "loopback-test",
//     "url": "mongodb://adminUser:pwd@cluster0-shard-00-00-xxx.mongodb.net:27017,cluster0-shard-00-01-xxx.mongodb.net:27017,cluster0-shard-00-02-xxx.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
// }
// const clientEnv = Object.entries(process.env)
//   .filter(([key]) => key.startsWith('CLIENT_ENV_'))
//   .reduce((obj, [key, value]) => ({ ...obj, [key]: value.trim() }), {});
// try {
// const clientEnv: [string, string | undefined][] = Object.entries(process.env);
// console.log('Enviroment', clientEnv);
const config = {
  name: 'wordzonia',
  connector: 'mongodb',
  // url: clientEnv['WORDZONIA_MONGO_URL'],
  url:
    'mongodb+srv://wordzonia:uMfvf5Vj52ZtGcfg@cluster0.vy6cw.mongodb.net/test?authSource=admin&replicaSet=atlas-8h75a4-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true',

  // host: '@cluster0.vy6cw.mongodb.net/',
  // port: 0,
  // user: 'wordzonia',
  // password: 'umfvf5vj52ztgcfg',
  // database: 'wordzonia',
  // usenewurlparser: true
};

// mongodb+srv://wordzonia:<password>@cluster0.vy6cw.mongodb.net/<dbname>?retryWrites=true&w=majority

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class WordzoniaDataSource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'wordzonia';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.wordzonia', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
