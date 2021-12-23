import { IsNotEmpty } from "class-validator";

export class CredentialsDto {
    @IsNotEmpty({
        message: 'Informe o e-mail do usuário!',
    })
    email: string;

    @IsNotEmpty({
        message: 'Informe a senha do usuário!',
    })
    password: string;
}