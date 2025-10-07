import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MigrationService } from '@modules/migrations/migration.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({logger: true})
  );
  const config = new DocumentBuilder()
    .setTitle('Balance')
    .setVersion('1.0')
    .addServer('/api/v1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.setGlobalPrefix('api/v1', {
    exclude: ['docs']
  });
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  const migration = app.get(MigrationService);
  await migration.run();
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0', (err, address) => {
    console.log(address);
  });
}
bootstrap();
