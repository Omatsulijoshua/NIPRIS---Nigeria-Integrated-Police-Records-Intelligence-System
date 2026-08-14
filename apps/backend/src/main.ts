import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalHttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('NIPRIS_Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger OpenAPI Documentation Configuration
  const config = new DocumentBuilder()
    .setTitle('NIPRIS Law Enforcement Platform API')
    .setDescription('Enterprise Nigeria Integrated Police Records Intelligence System REST API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs/api', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.log(`NIPRIS Gateway operating on port ${port} | API Docs: http://localhost:${port}/docs/api`);
}

bootstrap();
