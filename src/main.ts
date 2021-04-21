import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

const microserviceOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [
      'amqps://fzpzwsvr:pKByIWCBFy5XIvX59YRx3AdqZPgeolc7@fish.rmq.cloudamqp.com/fzpzwsvr',
    ],
    queue: 'blogs_queue',
    queueOptions: {
      durable: false,
    },
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );

  app.listen(() => console.log('Blog service is listening...'));
}

bootstrap();
