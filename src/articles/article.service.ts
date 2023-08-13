import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ArticleDto } from './dto'

@Injectable({})
export class ArticleService {
  constructor(private prisma: PrismaService) {}
  async getAllArticles() {
    try {
      const articles = await this.prisma.article.findMany()
      return articles
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  async getArticle(id: number) {
    try {
      const article = await this.prisma.article.findUnique({
        where: {
          id: +id,
        },
      })
      return article
    } catch (error) {
      throw error
    }
  }

  async getArticlesByKeyword(keywordId: number) {
    const keyword = await this.prisma.keyword.findUnique({
      where: { id: +keywordId },
      include: { articles: true },
    })

    if (!keyword) {
      return null
    }

    return {
      articles: keyword.articles,
      keyword: keyword.title,
    }
  }

  async createArticle(dto: ArticleDto) {
    const { title, description, keyword, content, imgUrl, videoUrl } = dto

    try {
      const article = await this.prisma.article.create({
        data: {
          title,
          description,
          content,
          imgUrl,
          videoUrl,
          keywords: {
            connect: {
              id: +keyword,
            },
          },
        },
      })

      return article
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async modifyArticle(dto: ArticleDto) {
    const { id, title, description, keyword } = dto

    try {
      const article = await this.prisma.article.update({
        where: {
          id: id,
        },
        data: {
          title,
          description,
          keywords: {
            connect: {
              id: keyword,
            },
          },
        },
      })

      return article
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deleteArticle(id: number) {
    try {
      const article = await this.prisma.article.delete({
        where: {
          id: id,
        },
      })

      return { message: 'Successfully deleted!' }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
