import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService extends SerializeService<CategoryEntity> {
  constructor(
    @InjectModel(CategoryEntity)
    private readonly categoryModel: ReturnModelType<typeof CategoryEntity>,
  ) {
    super(CategoryEntity);
  }

  async findAll() {
    const categories = await this.categoryModel.find({ isDeleted: false });

    return categories;
  }
}
