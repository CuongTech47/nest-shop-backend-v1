import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopsModule } from './shops/shops.module';
import dbConfig from './config/mongodb.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { KeysModule } from './keys/keys.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      // isGlobal: true,
    }),
    // MongooseModule.forRoot({
    //   // imports: [ConfigModule], // Import ConfigModule
    //   // useFactory: async (configService: ConfigService) => ({
    //   //   // uri: `mongodb://${configService.get('db.host')}:${configService.get('db.port')}/${configService.get('db.name')}`,
    //   //   // uri:`mongodb://atlas-sql-610b702335088b315e3dc0ce-tfzgh.a.query.mongodb.net/shopdev?ssl=true&authSource=admin`
    //   //   // uri:`mongodb://${configService.get('db.host')}/${configService.get('db.name')}?ssl=true&authSource=admin`
    //   //     uri:"mongodb+srv://ngoccuong:hr0WhLIfTnYMKIoU@cluster0.tfzgh.mongodb.net/shopdev"
    //   //   // useNewUrlParser: true,
    //   //   // useUnifiedTopology: true,
    //   // }),
    //   // inject: [ConfigService],
    // }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // Example key in your appConfig
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
   
    ShopsModule,
    AuthModule,
    KeysModule,
  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
