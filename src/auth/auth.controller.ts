import { Body, Controller, Post, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateShopDto } from './dto/create-shop.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('signup')
  @Version('1')
  @Post('auth/signup')
  async signUpV1(@Body() createShopDto: CreateShopDto) {
    return this.authService.signUp(createShopDto);
  }
  
}
