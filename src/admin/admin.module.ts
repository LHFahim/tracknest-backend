import { Module } from '@nestjs/common';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminCategoryModule } from './admin-category/admin-category.module';

@Module({
  imports: [AdminAuthModule, AdminCategoryModule],
})
export class AdminModule {}
