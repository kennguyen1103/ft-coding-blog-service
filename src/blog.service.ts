import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogDto } from './create-blog.dto';
import { UpdateBlogDto } from './update-blog.dto';

@Injectable()
export class BlogService {
  private admin = require('firebase-admin');

  constructor(
    @InjectRepository(Blog) private readonly blogRepo: Repository<Blog>,
  ) {
    var serviceAccount = {
      type: 'service_account',
      project_id: 'coding-test-nln',
      private_key_id: '90bb97e764cb25863ef9f2ca45dfdb574c53a158',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCtzDS9s8y0GjFl\nuXBHoENB6OodeI1T51HQWz77EicThzEjm4ZcyqJ46w7rLOXyYdlr6uZAynq/h3nN\nZ9wjo7FVzFZk0lDqPK5N+n04g4rHx7VXiePv+uSmYtXlLkETiHYR1FMGpX+NV/f9\nFKi5FIr4E8DCPTZ03Wl8CKRixJUNNRRuKXgoA7S+yW6R+B/QvPAH+yrIlzUCBk7J\nOACIGzQRXisSYXLZ+MfWCtdkzXQGL2cQq+CSkiLqzgLoQFp4imqevbos45YEgr33\nmnd4cfuHQGX6SfkMtTo006k5T6itcXHeNThiiQI6Spxw/ADHIpBzNpSHNyubCXkC\nZiklNzVFAgMBAAECggEAT8CAxTpwKYdJeqYNLXkP0/tnDy4GIGXqR6PPc1QBpXbo\nqC/SiNsdkkI/HtEEFeUr6dcpYLrpd+FZldXekWYo1rfFP0+5fLtquvLCqn/GW+W7\nQ9fNRo7JhMae46OFjkqU75qQnOCt9vTSogpsYD3ahXs+/YMsbZU6tgWbNY2C3kNl\n3uEqHls9NexRY13BWUJjQKlgltlK6W1+IgIiSANtpBuiPEnGhfbK5QRuMBqvDO2e\nkG6mYSECeMJ0cIvn/M8uES/RgcQjcMJN6YcwEEBLIyEZiu8b+8mbYHdAozJXb+l9\nkcggSB241sF09xln4UYByzVTk7TjknIItt4NNyRZwwKBgQDs7OHN1AyJItXk01/y\n4rZ47Uv7yLesbRsaPeqmHa1hBiZiQhphVxMVtXWbN4AG2VNNZluLGEt+glGJtkKw\n/b+Zu8Ty0gUjFbPKk5fNRNkICYfZR3ZukENNum+vFU28DRLo6uCzOwVu4U9iVUj2\n9pjIooxECxxa/aYhBgL8giDwcwKBgQC7yj12kVQz4K9hWNOYU8xltE27CU5WlgfM\nU2yKWj2hMt3fajVqReyHPSB0c+Fn864U9RtbrB8n/vmFICD1b0YARtY/B/o6SH5o\nkhMoMOVeXJWE8GrFJGh/wHkAhoObRUGvs4TaezralrUCiuLdqcGeF/b73cBtUol0\n+vAhvDTtZwKBgGc5GXP8o+2HkNseQJporglnkYhEPcnQy1MWkMoI+gXgkQ6UMDwi\nnL0DjxauCohxXPrG0rF6R0H58x5lmw7TrwuCpF8Ko5RSmz9yKFwVV91JkbdXjEDF\nd51A0fHc/T4mEAwMcROFbmuNnHGCKMT4UT5wm1313UfDZQLURK7Q3xsDAoGBALbp\nA/jrERL+tJSjCmaCqMIfXt7g75bSx4GzeDNCNmk+vHGSZ7i9pucLGQOUo2a3KUZs\nf1tJSYeRiMSsSK4G1i4K0T/Pq2D9n3KHZXVuOtswXsp/yd9/2PEmLjXez217hcF3\nn92Wzfp/dIunb9XsNRShzwYANh/FlvGEQkT5pqvdAoGAF1EA9+Am5rwiO8cV281d\n2LgPHdYLS5Eb3YU/ndW/OHolIj5h7AbhWJcdzn4qhANM4UXj5p7ckEFYZx33q/Kj\n0sRxcJ0fspeEjhLkWrp/+lTvg7YXQGEhC98qduPsoFB5yQlJTkKLEY42ipqEbJdT\nOT6Fm6k08FIAZGaArLPMviM=\n-----END PRIVATE KEY-----\n',
      client_email:
        'firebase-adminsdk-qh7ku@coding-test-nln.iam.gserviceaccount.com',
      client_id: '110797362798840348654',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qh7ku%40coding-test-nln.iam.gserviceaccount.com',
    };

    this.admin.initializeApp({
      credential: this.admin.credential.cert(serviceAccount),
      databaseURL: 'https://coding-test-nln-default-rtdb.firebaseio.com',
    });
  }

  async getBlogs(): Promise<Blog[]> {
    return this.blogRepo.find();
  }

  async createBlog(createBlogDto: CreateBlogDto) {
    //save in firebase
    try {
      const newBlog = await this.admin
        .firestore()
        .collection('Blogs')
        .add({
          ...createBlogDto,
        });

      let blog = new Blog();
      blog.id = newBlog.id;
      blog.title = createBlogDto.title;
      blog.content = createBlogDto.content;
      blog.url = createBlogDto.url;

      await this.blogRepo.save(blog);

      return { blog: newBlog };
    } catch (e) {
      return { error: e };
    }
  }

  async updateBlog(updateBlogDto: UpdateBlogDto) {
    try {
      const res = await this.admin
        .firestore()
        .collection('Blogs')
        .doc(updateBlogDto.id)
        .set({ ...updateBlogDto });

      const blog = await this.blogRepo.findOne(updateBlogDto.id);
      blog.title = updateBlogDto.title;
      blog.content = updateBlogDto.content;
      blog.url = updateBlogDto.url;

      await this.blogRepo.save(blog);

      return res;
    } catch (e) {
      return { error: e };
    }
  }

  async deleteBlog(id) {
    try {
      const res = await this.admin
        .firestore()
        .collection('Blogs')
        .doc(id)
        .delete();

      const entity = await this.blogRepo.findOne(id);
      await this.blogRepo.remove(entity);

      return res;
    } catch (e) {
      return { error: e };
    }
  }
}
