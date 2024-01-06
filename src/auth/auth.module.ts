import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ShopsModule } from 'src/shops/shops.module';
import { KeysModule } from 'src/keys/keys.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './utils/auth.utils';

@Module({
  imports:[ShopsModule,KeysModule,JwtModule.register({
    global: true,
  })],
  providers: [AuthService,TokenService],
  controllers: [AuthController]
})
export class AuthModule {}
