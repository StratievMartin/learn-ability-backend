import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
}
