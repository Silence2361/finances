import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto{
    @ApiProperty({ example: 'Food', description: 'The name of the category' })
    @IsString()
    name: string;
}