import { DynamicModule, Module } from '@nestjs/common'
import { SessionsModule, UsersModule } from 'src/domain'
import { JwtModule } from 'src/libs'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({})
export class RestAuthModule {
	static forRoot(): DynamicModule {
		return {
			module: RestAuthModule,
			imports: [
				UsersModule.forFeature(),
				SessionsModule.forFeature(),
				JwtModule.forFeature(),
			],
			providers: [AuthService],
			controllers: [AuthController],
		}
	}
}
