// interface AppConfig {
//     port: number;
// }

// interface DbConfig {
//     host: string;
//     port: number;
//     name: string;
// }

// interface Config {
//     app: AppConfig;
//     db: DbConfig;
// }

// interface EnvConfigs {
//     dev: Config;
//     prod: Config;
// }

// const dev: EnvConfigs['dev'] = {
//     app: {
//         port: process.env.DEV_APP_PORT ? parseInt(process.env.DEV_APP_PORT) : 3052,
//     },
//     db: {
//         host: process.env.DEV_DB_HOST || 'localhost',
//         port: process.env.DEV_DB_PORT ? parseInt(process.env.DEV_DB_PORT) : 27017,
//         name: process.env.DEV_DB_NAME || 'shopDev',
//     },
// };

// const prod: EnvConfigs['prod'] = {
//     app: {
//         port: process.env.PROD_APP_PORT ? parseInt(process.env.PROD_APP_PORT) : 3000,
//     },
//     db: {
//         host: process.env.PROD_DB_HOST || 'localhost',
//         port: process.env.PROD_DB_PORT ? parseInt(process.env.PROD_DB_PORT) : 27017,
//         name: process.env.PROD_DB_NAME || 'shopProd',
//     },
// };

// const config: EnvConfigs = { dev, prod };

// const env: keyof EnvConfigs = process.env.NODE_ENV as keyof EnvConfigs || 'dev';

// console.log(config[env], env);

// export default config[env];

// src/config/db.config.ts

import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  host: process.env.NODE_ENV === 'development' ? process.env.PROD_DB_HOST || 'localhost' : process.env.DEV_DB_HOST || 'localhost',
  port: process.env.NODE_ENV === 'development' ? parseInt(process.env.PROD_DB_PORT) : parseInt(process.env.DEV_DB_PORT) || 27017,
  name: process.env.NODE_ENV === 'development' ? process.env.PROD_DB_NAME || 'shopDev-nestjs-dev' : process.env.DEV_DB_NAME || 'shopDev-nestjs-pro',
}));
