import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { KeywordDto } from './dto';

@Injectable()
export class KeywordService {
    constructor(private prisma: PrismaService) {}

    async getAllKeywords() {
        try {
            const keywords = await this.prisma.keyword.findMany();
            return keywords;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createKeyword(dto: KeywordDto) {
        const { title } = dto;
        try {
            const keyword = await this.prisma.keyword.create({
                data: {
                    title,
                },
            });
            return keyword;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteKeyword(id: number) {
        try {
            const keyword = await this.prisma.keyword.delete({
                where: {
                    id: id,
                },
            });

            return { message: 'Successfully deleted!' };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
