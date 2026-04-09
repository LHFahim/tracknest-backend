import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AdminModule } from './admin/admin.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { LostItemModule } from './lost-item/lost-item.module';
import { CategoryModule } from './category/category.module';
import { FoundItemModule } from './found-item/found-item.module';
import { ClaimModule } from './claim/claim.module';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.MONGODB_URL,
      }),
      inject: [ConfigService],
    }),

    ConfigModule,
    UserModule,
    AuthModule,

    AdminModule,

    ProfileModule,

    LostItemModule,

    CategoryModule,

    FoundItemModule,

    ClaimModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
