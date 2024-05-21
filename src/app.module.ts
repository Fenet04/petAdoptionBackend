import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from 'src/pets/pets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AdoptionApplicationsModule } from './adoption-applications/adoption-applications.module';
import { VisitApplicationsModule } from './visit-applications/visit-applications.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [PetsModule, UsersModule, AdoptionApplicationsModule, VisitApplicationsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
