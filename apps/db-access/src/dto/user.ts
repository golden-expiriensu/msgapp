import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsOptional()
    @IsPhoneNumber()
    phoneNumber: string;
    
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dateOfBirth: Date;

    @IsOptional()
    @IsString()
    sex: string;
}