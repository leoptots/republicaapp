import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDtoWhitRole } from 'src/users/dtos/create-user-with-role.dto';

import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) { }

    async signUp(createUserDto: CreateUserDtoWhitRole){
        if (createUserDto.password != createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem');
        } else {
            return await this.userRepository.createUser(createUserDto);
        }
    }
}
