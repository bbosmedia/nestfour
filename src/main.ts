import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT, ()=>{
    console.log('Server is running perfectly. ' + process.env.PORT)
  });
}
start();
