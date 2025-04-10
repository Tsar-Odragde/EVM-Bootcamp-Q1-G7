import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
// import * as dotenv from "dotenv";

// dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Enable CORS for frontend requests
    app.enableCors({
      origin: '*', 
      methods: 'GET,POST',
      allowedHeaders: 'Content-Type,Authorization',
    });

  const config = new DocumentBuilder()
    .setTitle("API example")
    .setDescription("The API description")
    .setVersion("1.0")
    .addTag("example")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
