import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import dbConfig from './config/mongodb.config';
import { VersioningType  } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { HttpExceptionFilter } from './Exceptions/GlobalExceptionFilter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule , {cors: true});


  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService); // Inject ConfigService directly
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  // const port = configService.get('app.port') || 3000;

  const port = 3000;
  
  await app.listen(port);

  // console.log(appConfig()); // Log cấu hình app từ file app.config.ts

  console.log(`Server is runing with port ${port}`)

  console.log(dbConfig()); // Log cấu hình database từ file mongodb.config.ts

}

bootstrap();
