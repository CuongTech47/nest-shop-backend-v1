import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop } from './shop.model';

@Injectable()
export class ShopsService {
    constructor(
        @InjectModel('Shop') private readonly shopModel: Model<Shop>,
    ) {}
}
