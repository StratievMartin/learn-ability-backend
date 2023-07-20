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
} from '@nestjs/common'
import { CourseService } from './course.service'
import { CourseDto } from './dto'
import { Public } from 'src/auth/decorator'

@Public()
@Controller()
export class CourseController {
  constructor(private courseService: CourseService) {}
  @HttpCode(HttpStatus.OK)
  @Get('courses')
  getAllCourses() {
    return this.courseService.getAllCourses()
  }

  @Get('courses/:id')
  getCourse(@Param('id') id: number) {
    return this.courseService.getCourse(id)
  }

  @Post('courses')
  addCourse(@Body() dto: CourseDto) {
    return this.courseService.createCourse(dto)
  }

  @Put('courses/:id')
  modifyCourse(@Body() dto: CourseDto) {
    return this.courseService.modifyCourse(dto)
  }

  @Delete('courses/:id')
  deleteCourse(@Param('id') id: number) {
    return this.courseService.deleteCourse(Number(id))
  }
}
