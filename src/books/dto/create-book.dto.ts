import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min, Max } from 'class-validator';

export class CreateBookDto {
    @ApiProperty({ example: 'Treasure Island' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'Robert Louis Stevenson' })
    @IsString()
    author: string;

    @ApiProperty({ example: 1883 })
    @IsInt()
    @Min(1000, { message: 'Year must be 4 digits' }) //year is a 4 digits number
    @Max(9999, { message: 'Year must be 4 digits' })
    year: number;
}
