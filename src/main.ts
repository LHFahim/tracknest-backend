import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const logger = new Logger('Server is starting up!');
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const configService: ConfigService = app.get(ConfigService);
  const PORT = configService.PORT;

  const validationPipe = new ValidationPipe({
    whitelist: true,
    stopAtFirstError: true,
    transform: true,
    transformOptions: {
      enableCircularCheck: true,
      exposeDefaultValues: true,
    },
  });

  app.useGlobalPipes(validationPipe);

  const config = new DocumentBuilder()
    .setTitle('TrackNest')
    .setDescription('TrackNest API description')
    .addBearerAuth({
      description: 'JWT Token',
      type: 'http',
      name: 'Authorization',
      bearerFormat: 'JWT',
    })
    .setVersion('1.0')
    .addTag('TrackNest')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      syntaxHighlight: {
        activate: true,
        theme: 'obsidian',
      },
      docExpansion: 'none',
      displayRequestDuration: true,
      defaultModelExpandDepth: 8,
      defaultModelsExpandDepth: 8,
    },
    customSiteTitle: 'TrackNest API Docs',
  });

  await app.listen(PORT);
  logger.log(`Server started on http://localhost:${PORT}/api`);
}
bootstrap();
