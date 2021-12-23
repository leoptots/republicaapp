import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDtoWhitRole } from 'src/users/dtos/create-user-with-role.dto';
import { CredentialsDto } from 'src/users/dtos/credentials.dto';
import { UserRepository } from 'src/users/users.repository';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        ) { }

    async signUp(createUserDto: CreateUserDtoWhitRole) {
        if (createUserDto.password != createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem');
        } else {
            return await this.userRepository.createUser(createUserDto);
        }
    }

    async signIn(credentialsDto: CredentialsDto) {
        const user = await this.userRepository.checkCredentials(credentialsDto);

        if (user === null) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const jwtPayload = {
            id: user.id,
        };

        const token = await this.jwtService.sign(jwtPayload);
        
        return { token };
    }
}
