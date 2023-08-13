import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator'
export class ArticleDto {
  @IsNumber()
  @IsOptional()
  id?: number

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsUrl()
  @IsOptional()
  videoUrl?: string

  @IsUrl()
  @IsOptional()
  imgUrl?: string

  @IsOptional()
  keyword?: number

  // @IsString()
  // author: []

  // @IsArray()
  // comments: []
}
