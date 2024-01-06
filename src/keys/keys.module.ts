import { Module } from '@nestjs/common';
import { KeysService } from './keys.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Key, KeySchema } from './keyToken.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Key.name, schema: KeySchema }])],
  providers: [KeysService],
  exports: [KeysService],
  

})
export class KeysModule {}
