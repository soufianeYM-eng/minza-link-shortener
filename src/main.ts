import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // #region Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Minza Link Shortener')
    .setDescription('API Documentation for Minza')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // #endregion
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
