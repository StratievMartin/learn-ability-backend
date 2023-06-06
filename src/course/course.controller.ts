import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common'
import { CourseService } from './course.service'
import { CourseDto } from './dto'

@Controller()
export class CourseController {
  constructor(private courseService: CourseService) {}
  @HttpCode(HttpStatus.OK)
  @Get('courses')
  getAllCourses() {
    return this.courseService.getAllCourses()
  }

  @Get('courses/:id')
  getCourse(@Param('id') id) {
    return this.courseService.getCourse(id)
  }
  @Post('courses')
  addCourse(@Body() dto: CourseDto) {
    console.log('in controller', dto)

    return this.courseService.createCourse(dto)
  }
}
