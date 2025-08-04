
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min } from 'class-validator';
//import { Type } from 'class-transformer';



export class CreateReviewDto {
    @ApiProperty({ example: '1' })
    @IsInt()
    bookID: number;

    @ApiProperty({ example: '5' })
    // @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiProperty({ example: "Amazing book!" })
    @IsString()
    comment: string;
}
