import { IsString , IsEmail , IsNotEmpty , Length , Matches } from 'class-validator';

export class CreateShopDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 150)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    password: string;
    
}