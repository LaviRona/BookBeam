import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min, Max } from 'class-validator';

export class CreateBookDto {
    @ApiProperty({ example: 'Clean Code' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'Robert C. Martin' })
    @IsString()
    author: string;

    @ApiProperty({ example: 2008 })
    @IsInt()
    @Min(1000) //year is a 4 digits number
    @Max(9999)
    year: number;
}
