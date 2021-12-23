import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from './user-roles.enum';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDtoWhitRole } from './dtos/create-user-with-role.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createSuperUser(
        createUserDto: CreateUserDto,
        role: UserRole,
    ): Promise<User> {
        const { email, name, password } = createUserDto
        const user = await this.basicUser(email, name, password)

        user.role = UserRole.DECANO

        return await this.saveUser(user)
    }

    async createUser(
        createUserDto: CreateUserDtoWhitRole,
    ): Promise<User> {
        const { email, name, password, role } = createUserDto
        const user = await this.basicUser(email, name, password)

        user.role = role
        return await this.saveUser(user)
    }

    private async basicUser(email: string, name: string, password: string): Promise<User> {
        const user = this.create()

        user.email = email
        user.name = name
        user.status = true
        user.confirmationToken = crypto.randomBytes(32).toString('hex')
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, user.salt);

        return user
    }

    private async saveUser(
        user: User,
    ): Promise<User> {

        try {
            await user.save();
            delete user.password;
            delete user.salt;
            return user;
        } catch (error) {
            if (error.code.toString() === '23505') {
                throw new ConflictException('Endereço de email já está em uso');
            } else {
                console.log(error)
                throw new InternalServerErrorException(
                    'Erro ao salvar o usuário no banco de dados',
                );
            }
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}