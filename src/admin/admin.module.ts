import { Module } from '@nestjs/common';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminCategoryModule } from './admin-category/admin-category.module';
import { AdminFoundItemModule } from './admin-found-item/admin-found-item.module';
import { AdminHandoverModule } from './admin-handover/admin-handover.module';
import { AdminLostItemModule } from './admin-lost-item/admin-lost-item.module';

@Module({
  imports: [
    AdminAuthModule,
    AdminCategoryModule,
    AdminLostItemModule,
    AdminFoundItemModule,
    AdminHandoverModule,
  ],
})
export class AdminModule {}
