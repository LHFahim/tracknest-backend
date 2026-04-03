import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AdminAuthModule } from '../admin-auth/admin-auth.module';
import { AdminCategoryController } from './admin-category.controller';
import { AdminCategoryService } from './admin-category.service';
import { CategoryEntity } from './entities/admin-category.entity';

@Module({
  imports: [TypegooseModule.forFeature([CategoryEntity]), AdminAuthModule],
  controllers: [AdminCategoryController],
  providers: [AdminCategoryService],
})
export class AdminCategoryModule {}
