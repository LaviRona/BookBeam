import {
    IsOptional,
    IsString,
    IsInt,
    Min,
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
    @Min(0)
    year?: number;

    @IsOptional()
    @IsIn(['title', 'author', 'year'])
    sortBy?: 'title' | 'author' | 'year';

    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc';
}
