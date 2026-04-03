import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigService } from 'src/config/config.service';
import { UserModule } from 'src/user/user.module';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';

@Global()
@Module({
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
  imports: [
    TypegooseModule.forFeature([]),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.JWT_SECRET,
        global: true,
        signOptions: { expiresIn: '300s' },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
  ],
  exports: [AdminAuthService, JwtModule, AuthModule],
})
export class AdminAuthModule {}
