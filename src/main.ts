import * as dotenv from 'dotenv'
dotenv.config()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as basicAuth from 'express-basic-auth'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { DomainExceptionsFilter } from './shared'
import { Logger, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: { excludeExtraneousValues: true },
		}),
	)

	app.enableCors({
		origin: '*',
	})

	app.use(
		'/docs',
		basicAuth({
			challenge: true,
			users: {
				admin: '1065473nbgl',
			},
		}),
	)

	const config = new DocumentBuilder()
		.setTitle('Test Api')
		.setDescription('The API description')
		.setVersion('1.0')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, document)

	app.useGlobalFilters(new DomainExceptionsFilter(new Logger()))

	await app.listen(3000)
}

bootstrap()
