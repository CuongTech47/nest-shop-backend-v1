import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, mongo } from 'mongoose';

export type ShopDocument = HydratedDocument<Key>;

@Schema({ timestamps: true })
export class Key {
  @Prop({ type: mongo.ObjectId, ref: 'Shop', required: true })
  user: string;

  @Prop({ type: String, required: true })
  publicKey: string;

  @Prop({ type: String, required: true })
  privateKey: string;

  @Prop({ type: Array, default: [] })
  refreshTokensUsed: string[];

  @Prop({ type: String, required: true })
  refreshToken: string;
}

export const KeySchema = SchemaFactory.createForClass(Key);
