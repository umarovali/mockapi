import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import * as cookieParser from "cookie-parser";
import { WinstonModule } from "nest-winston";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
async function start() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Medical API")
    .setDescription(
      "REST API for managing appointments, treatments, and more. About Clinic"
    )
    .addServer("api")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  app.use(cookieParser());
  app.setGlobalPrefix("api");

  app.enableCors({
    origin: "http://localhost:3311",
    credentials: true,
  });

  const PORT = process.env.PORT;
  await app.listen(PORT ?? 3001, () => {
    console.log(` Server started at: http://localhost:${PORT}  `);
    console.log(`Swagger included: http://localhost:${PORT}/docs `);
  });
}

start();
