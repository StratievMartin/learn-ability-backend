import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class KeywordDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    // @IsArray()
    // articles: []
    // @IsArray()
    // courses: []
}
