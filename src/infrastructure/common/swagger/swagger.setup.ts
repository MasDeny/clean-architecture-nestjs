import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Clean Architecture on API')
    .setDescription('Clean Architecture system design')
    .setVersion('1.0')
    .setLicense('MIT', 'MIT')
    .addBearerAuth(
      { type: 'apiKey', name: 'x-access-token', in: 'header' },
      'jwt',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
}
