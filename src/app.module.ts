import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Blog } from './blog.entity';
import { BlogModule } from './blog.module';
import { BlogService } from './blog.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'queenie.db.elephantsql.com',
      port: 5432,
      username: 'ihhqhyhx',
      password: 'rO4JrTnkGYUNAxDnrHlsCu_kdBHKUNRN',
      database: 'ihhqhyhx',
      entities: [Blog],
      synchronize: true,
    }),
    BlogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
