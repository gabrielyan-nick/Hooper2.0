import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CourtModule } from './court/court.module';
import { AuthModule } from './auth/auth.module';
import { MarkerModule } from './marker/marker.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    CourtModule,
    AuthModule,
    MarkerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
