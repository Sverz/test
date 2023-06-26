import { DynamicModule, Global, Module } from '@nestjs/common'
import { JwtModule, provideEntity } from 'src/libs'
import { Session } from './entities'
import { AuthGuard } from './guards'
import { SessionsService } from './services'
import { SESSIONS_REPOSITORY, SESSIONS_SERVICE } from './typing'
import { UsersModule } from '../users/users.module'

@Global()
@Module({})
export class SessionsModule {
	static getProviders() {
		return [
			{ provide: SESSIONS_SERVICE, useClass: SessionsService },
			provideEntity(SESSIONS_REPOSITORY, Session),
			AuthGuard,
		]
	}

	static getImports() {
		return [JwtModule.forFeature(), UsersModule.forFeature()]
	}

	static getExports() {
		return [SESSIONS_SERVICE]
	}

	static forRoot(): DynamicModule {
		return {
			module: SessionsModule,
			imports: SessionsModule.getImports(),
			providers: SessionsModule.getProviders(),
			exports: SessionsModule.getExports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: SessionsModule,
			imports: SessionsModule.getImports(),
			providers: SessionsModule.getProviders(),
			exports: SessionsModule.getExports(),
		}
	}
}
