import {
    IsArray,
    IsDecimal,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsOptional,
    IsString,
} from 'class-validator';

export class CourseDto {
    @IsNumber()
    id?: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumberString({}, { message: 'Please provide a valid number' })
    @IsDecimal({}, { message: 'Please provide a valid number or decimal' })
    price: string;

    // @IsArray()
    // lectures: []

    // @IsArray()
    @IsOptional()
    keyword: number;

    // @IsArray()
    // authors: []

    // @IsArray()
    // students: []

    // @IsArray()
    // comments: []

    // @IsArray()
    // articles: []
}
