import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    async createTokenPair(payload: any, publicKey: string, privateKey: string) {
        try {
           
          const accessToken = await this.jwtService.sign(payload, {
            expiresIn: '15m',
            // algorithm: 'RS256',
            secret: publicKey
          });
    
          const refreshToken = await this.jwtService.sign(payload, {
            expiresIn: '7d',
            // algorithm: 'RS256',
            secret: privateKey, // Your private key
          });


          this.jwtService.verify(accessToken, { secret: publicKey });
    
          return {
            accessToken,
            refreshToken,
          };
        } catch (error) {
          // Handle errors if needed
          throw new HttpException('Error creating token pair', 400);
       
        }
      }
}