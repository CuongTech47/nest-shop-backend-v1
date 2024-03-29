import { Module } from '@nestjs/common';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from './shop.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }])],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports: [MongooseModule],
})
export class ShopsModule {}
