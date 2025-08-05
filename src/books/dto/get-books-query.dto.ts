import {
    IsOptional,
    IsString,
    IsInt,
    Min, Max,
    IsIn,
} from 'class-validator';


export class GetBooksQueryDto {
    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsInt()
    @Min(1000, { message: 'Year must be 4 digits' })
    @Max(9999, { message: 'Year must be 4 digits' })
    year?: number;

    @IsOptional()
    @IsIn(['title', 'author', 'year'])
    sortBy?: 'title' | 'author' | 'year';

    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc';
}
