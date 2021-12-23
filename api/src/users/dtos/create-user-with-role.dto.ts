import { IsEmail, IsEnum, IsNotEmpty, MinLength, NotEquals } from "class-validator";
import { UserRole } from "../user-roles.enum";
import { CreateUserDto } from "./create-user.dto";

export class CreateUserDtoWhitRole extends CreateUserDto {
  @IsNotEmpty({
    message: 'O tipo do usuário deve estar preenchido.',
  })
  @IsEnum(UserRole)
  @NotEquals(UserRole.DECANO)
  role: UserRole
}