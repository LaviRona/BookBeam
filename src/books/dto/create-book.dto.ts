import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class CreateBookDto {
    @ApiProperty({ example: 'Clean Code' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'Robert C. Martin' })
    @IsString()
    author: string;

    @ApiProperty({ example: 2008 })
    @IsInt()
    @Min(0)
    year: number;
}
