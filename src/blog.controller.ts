import { Controller, Get } from '@nestjs/common';
import { BlogService } from './blog.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateBlogDto } from './create-blog.dto';
import { UpdateBlogDto } from './update-blog.dto';

@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @MessagePattern('getBlogs')
  getBlogs() {
    return this.blogService.getBlogs();
  }

  @MessagePattern('createBlog')
  createBlog(createBlogDto: CreateBlogDto) {
    return this.blogService.createBlog(createBlogDto);
  }

  @MessagePattern('deleteBlog')
  deleteBlog(id) {
    return this.blogService.deleteBlog(id);
  }

  @MessagePattern('updateBlog')
  updateBlog(updateBlogDto: UpdateBlogDto) {
    return this.blogService.updateBlog(updateBlogDto);
  }
}
