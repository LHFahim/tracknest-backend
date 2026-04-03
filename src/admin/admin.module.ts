import { Module } from '@nestjs/common';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminCategoryModule } from './admin-category/admin-category.module';
import { AdminLostItemModule } from './admin-lost-item/admin-lost-item.module';

@Module({
  imports: [AdminAuthModule, AdminCategoryModule, AdminLostItemModule],
})
export class AdminModule {}
