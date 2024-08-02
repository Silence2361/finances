import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"


export class CreateUserDto{

    @ApiProperty()
    @IsEmail()
    email: string; 

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(12)
    password: string;

    @ApiProperty()
    @IsString()
    role: string;
}