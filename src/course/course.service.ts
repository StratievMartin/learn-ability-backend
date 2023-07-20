import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CourseDto } from './dto'

@Injectable({})
export class CourseService {
  constructor(private prisma: PrismaService) {}
  async getAllCourses() {
    try {
      const courses = await this.prisma.course.findMany()
      return courses
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  async getCourse(id: number) {
    try {
      const course = await this.prisma.course.findUnique({
        where: {
          id: +id,
        },
      })
      return course
    } catch (error) {
      throw error
    }
  }

  async createCourse(dto: CourseDto) {
    const { title, description, price, keyword } = dto

    try {
      const course = await this.prisma.course.create({
        data: {
          title,
          description,
          price: Number(price),
          keywords: {
            connect: {
              id: keyword,
            },
          },
        },
      })

      return course
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async modifyCourse(dto: CourseDto) {
    const { id, title, description, price, keyword } = dto

    try {
      const course = await this.prisma.course.update({
        where: {
          id: id,
        },
        data: {
          title,
          description,
          price: Number(price),
          keywords: {
            connect: {
              id: keyword,
            },
          },
        },
      })

      return course
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deleteCourse(id: number) {
    try {
      const course = await this.prisma.course.delete({
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
