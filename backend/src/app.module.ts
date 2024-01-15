import { Module } from '@nestjs/common';
import { RegisterModule } from '@modules/register/register.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ProfileModule } from '@modules/profile/profile.module';
import { MapModule } from '@modules/map/map.module';

@Module({
  imports: [RegisterModule, AuthModule, ProfileModule, MapModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
