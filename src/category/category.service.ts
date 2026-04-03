import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import {
  AdminCategoryPaginatedDto,
  AdminCategoryQueryDto,
  CategoryDto,
} from 'src/admin/admin-category/dto/admin-category.dto';
import { CategoryEntity } from 'src/admin/admin-category/entities/admin-category.entity';

@Injectable()
export class CategoryService extends SerializeService<CategoryEntity> {
  constructor(
    @InjectModel(CategoryEntity)
    private readonly categoryModel: ReturnModelType<typeof CategoryEntity>,
  ) {
    super(CategoryEntity);
  }

  async findAll(
    userId: string,
    query: AdminCategoryQueryDto,
  ): Promise<AdminCategoryPaginatedDto> {
    const categories = await this.categoryModel
      .find({
        isDeleted: false,
        ...(query.search && {
          $or: [
            { name: new RegExp(`.*${query.search}.*`, 'i') },
            { description: new RegExp(`.*${query.search}.*`, 'i') },
          ],
        }),
      })
      .sort({ [query.sortBy]: query.sort })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize);

    const categoriesCount = await this.categoryModel.countDocuments({
      isDeleted: false,

      ...(query.search && {
        $or: [
          { name: new RegExp(`.*${query.search}.*`, 'i') },
          { description: new RegExp(`.*${query.search}.*`, 'i') },
        ],
      }),
    });

    return {
      items: this.toJSONs(categories, CategoryDto),
      pagination: {
        total: categoriesCount,
        current: query.page,
        previous: query.page === 1 ? 1 : query.page - 1,
        next:
          categories.length > query.page * query.pageSize
            ? query.page + 1
            : query.page,
      },
    };
  }

  async findOne(userId: string, id: string) {
    const category = await this.categoryModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.toJSON(category, CategoryDto);
  }
}
