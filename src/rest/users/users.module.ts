import { DynamicModule, Module } from '@nestjs/common'
import {  UsersModule } from 'src/domain'
import { RestUserController } from './users.controller'
import { RestUserService } from './users.service'
import { JwtModule } from 'src/libs'
@Module({})
export class RestUserModule {
	static forRoot(): DynamicModule {
		return {
			module: RestUserModule,
			imports: [
				UsersModule.forFeature(),
				JwtModule.forFeature(),
			],
			controllers: [RestUserController],
			providers: [RestUserService],
		}
	}
}
