import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './infrastructure/common/filter/exception.filter';
import { LoggingInterceptor } from './infrastructure/common/interceptor/logger.interceptor';
import { LoggerService } from './infrastructure/logger/logger.service';
import { ResponseInterceptor } from './infrastructure/common/interceptor/response.interceptor';
import { setupSwagger } from './infrastructure/common/swagger/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'log'],
  });
  // app.use(compression({ filter: shouldCompress, threshold: 1 }));
  // function shouldCompress(req, res) {
  //   if (req.headers['x-no-compression']) {
  // don't compress responses with this request header
  //     return false;
  //   }

  // fallback to standard filter function
  //   return compression.filter(req, res);
  // }
  app.disable('x-powered-by');
  // app.useStaticAssets(join(__dirname, '..', process.env.UPLOAD_PREFIX), {
  //   prefix: `/${process.env.UPLOAD_PREFIX}`,
  // });
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(`api/${process.env.VERSION}`);
  app.enableCors({
    credentials: true,
    origin: (_origin, callback) => callback(null, true),
  });
  setupSwagger(app);
  await app.listen(process.env.APP_PORT, '0.0.0.0');
}
bootstrap().then(() => {
  console.log(
    '\x1b[32m%s\x1b[0m',
    `[Server] - Server is running at ${process.env.BASEURL} 🚀`,
  );
});
