import { TokenService } from './utils/auth.utils';
import { RoleShop } from './enum/role-shop.enum';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop } from '../shops/shop.model';
import { CreateShopDto } from './dto/create-shop.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { KeysService } from '../keys/keys.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Shop') private readonly shopModel: Model<Shop>,
    private readonly keysService: KeysService,

    private readonly tokenService: TokenService,
  ) {}

  async signUp(createShopDto: any) {
    try {
      const { name, email, password } = createShopDto;
      
      const existingShop = await this.shopModel.findOne({ email }).lean();

      console.log('existingShop::', existingShop);

      if (existingShop) {
        throw new HttpException(
          'Email đã tồn tại',400
        );
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newShop = await this.shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        const privateKey = crypto.randomBytes(32).toString('hex');
        const publicKey = crypto.randomBytes(32).toString('hex');

        console.log({ privateKey, publicKey });

        const keyStore = await this.keysService.createKeyToken({
          userId: newShop._id,
          privateKey,
          publicKey,
          refreshToken: null,
        });

        console.log('keyStore', keyStore);

        if (!keyStore) {
          throw new HttpException('Error creating keyStore', 400);
        }

        const payload = {
          userId: newShop._id,
          email,
        };

        const tokens = await this.tokenService.createTokenPair(
          payload,
          publicKey,
          privateKey,
        );

        return {
          shop: newShop,
          ...tokens,
        };
      }
    } catch (error) {
      return {
        message: error.message,
        statusCode: error.status,
      };
      }
    }
  }

