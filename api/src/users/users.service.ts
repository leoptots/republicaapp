import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from './user-roles.enum';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }

    async createSuperUser(createUserDto: CreateUserDto) {
        let nDecano = 0

        nDecano = await this.userRepository.count({
            where: {
                role: UserRole.DECANO
            }
        })
        
        if (nDecano !== 0) throw new UnprocessableEntityException('Só é permitido o cadastro de um Decano!')
        if (createUserDto.password != createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem');
        } else {
            return this.userRepository.createSuperUser(createUserDto, UserRole.DECANO);
        }
    }
}
