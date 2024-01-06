import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type ShopDocument = HydratedDocument<Shop>;

@Schema({ timestamps: true })
export class Shop {
  @Prop({ required: true, trim: true, maxlength: 150 })
  name: string;

  @Prop({ required: true, trim: true, maxlength: 150, unique: true })
  email: string;

  @Prop({
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  })
  status: string;

  @Prop({ default: false })
  verify: boolean;

  @Prop([String])
  roles: string[];
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
