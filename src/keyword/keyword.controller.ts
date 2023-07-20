import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common'
import { KeywordDto } from './dto'
import { KeywordService } from './keyword.service'
import { Public } from 'src/auth/decorator'
@Public()
@Controller()
export class KeywordController {
  constructor(private keywordService: KeywordService) {}
  @HttpCode(HttpStatus.OK)
  @Get('keywords')
  getAllKeywords() {
    return this.keywordService.getAllKeywords()
  }

  @Post('keywords')
  createKeyword(@Body() dto: KeywordDto) {
    return this.keywordService.createKeyword(dto)
  }

  @Delete('keywords/:id')
  deleteKeyword(@Param('id') id: number) {
    return this.keywordService.deleteKeyword(Number(id))
  }
}
