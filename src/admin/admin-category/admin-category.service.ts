import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import slugify from 'slugify';
import {
  AdminCategoryPaginatedDto,
  AdminCategoryQueryDto,
  CategoryDto,
  CreateCategoryDto,
} from './dto/admin-category.dto';
import { CategoryEntity } from './entities/admin-category.entity';

@Injectable()
export class AdminCategoryService extends SerializeService<CategoryEntity> {
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

  async createOne(userId: string, body: CreateCategoryDto) {
    const slug = slugify(body.name, { lower: true, strict: true, trim: true });

    const existingCategory = await this.categoryModel.findOne({ slug });
    if (existingCategory) {
      throw new Error('Category with the same name already exists');
    }

    const category = await this.categoryModel.create({
      ...body,
      slug,
      parentCategory: undefined,
      createdBy: userId,
      isActive: true,
      isDeleted: false,
    });

    return this.toJSON(category, CategoryDto);
  }
}
