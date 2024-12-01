import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto';
import { Public } from 'src/auth/decorator';

@Public()
@Controller()
export class ArticleController {
    constructor(private articleService: ArticleService) {}

    @HttpCode(HttpStatus.OK)
    @Get('articles')
    getAllArticles() {
        return this.articleService.getAllArticles();
    }

    @Get('articles/:id')
    getArticle(@Param('id') id: number) {
        return this.articleService.getArticle(id);
    }

    @Get('articles/kwd/:keywordId')
    getArticlesByKeyword(@Param('keywordId') keywordId: number) {
        return this.articleService.getArticlesByKeyword(keywordId);
    }

    @Post('articles')
    addArticle(@Body() dto: ArticleDto) {
        console.log('incoming data:', dto);

        return this.articleService.createArticle(dto);
    }

    @Put('articles/:id')
    modifyArticle(@Body() dto: ArticleDto) {
        return this.articleService.modifyArticle(dto);
    }

    @Delete('articles/:id')
    deleteArticle(@Param('id') id: number) {
        return this.articleService.deleteArticle(Number(id));
    }
}
