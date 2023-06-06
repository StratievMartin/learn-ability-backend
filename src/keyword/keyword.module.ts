import { Module } from '@nestjs/common'
import { KeywordService } from './keyword.service'
import { KeywordController } from './keyword.controller'

@Module({
  providers: [KeywordService],
  controllers: [KeywordController],
})
export class KeywordModule {}
