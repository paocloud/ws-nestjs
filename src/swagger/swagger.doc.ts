import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function createSwaggerDoc (app: any)  {
  const options = new DocumentBuilder()
    .setTitle('WS NestJS Example API')
    .setDescription('This is example API by PaOCLOUD ACADEMY')
    .setVersion('1.0.0')
    .setContact("Payungsak Klinchampa","https://www.paocloud.in.th","pao@paocloud.in.th")
    .setLicense("MIT","https://www.paocloud.in.th/api-license/")
    .setTermsOfService("https://www.paocloud.in.th/term-of-services/")
    .addTag('nestjs')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}
