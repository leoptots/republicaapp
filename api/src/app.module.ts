import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { UserRepository } from './users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    UsersModule, 
    AuthModule],
  controllers: [],
  providers: [],
  exports: [
  ]
})
export class AppModule {}
