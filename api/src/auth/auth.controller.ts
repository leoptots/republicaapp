import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDtoWhitRole } from 'src/users/dtos/create-user-with-role.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(
      @Body(ValidationPipe) createUserDto: CreateUserDtoWhitRole,
    ): Promise<{ message: string }> {
      await this.authService.signUp(createUserDto);
      return {
        message: 'Cadastro realizado com sucesso',
      };
    }
}
