import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Key } from './keyToken.model';
@Injectable()
export class KeysService {
  constructor(@InjectModel('Key') private readonly keyModel: Model<Key>) {}

  async createKeyToken({ userId, publicKey, privateKey, refreshToken }) {
    try {
        const filter = { user :userId };

    const update = {
      publicKey,
      privateKey,
      refreshTokensUsed: [],
      refreshToken,
    };

    const options = { upsert: true, new: true };

    const tokens = await this.keyModel.findOneAndUpdate(filter, update, options);

    

    return tokens ? tokens.publicKey : null;
    } catch (error) {
        return error
    }
  }
}
