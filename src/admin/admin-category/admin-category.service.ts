import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import slugify from 'slugify';
import {
  AdminCategoryPaginatedDto,
  AdminCategoryQueryDto,
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
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

  private createSlug(name: string) {
    const slug = slugify(name, { lower: true, strict: true, trim: true });

    if (!slug) {
      throw new BadRequestException('Category name is required');
    }

    return slug;
  }

  private async getUniqueSlug(name: string, categoryId?: string) {
    const baseSlug = this.createSlug(name);
    let slug = baseSlug;
    let suffix = 2;

    while (
      await this.categoryModel.exists({
        slug,
        isDeleted: false,
        ...(categoryId && { _id: { $ne: categoryId } }),
      })
    ) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    return slug;
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
    const slug = await this.getUniqueSlug(body.name);

    const existingCategory = await this.categoryModel.findOne({ slug });
    if (existingCategory) {
      throw new ConflictException('Category with the same name already exists');
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

  async updateOne(userId: string, id: string, body: UpdateCategoryDto) {
    const category = await this.categoryModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (body.name) {
      category.slug = await this.getUniqueSlug(body.name, id);
    }

    Object.assign(category, body);

    await category.save();

    return this.toJSON(category, CategoryDto);
  }

  async deleteOne(userId: string, id: string) {
    const category = await this.categoryModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    category.isDeleted = true;
    category.isActive = false;

    await category.save();

    return this.toJSON(category, CategoryDto);
  }
}
