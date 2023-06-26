import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs'
import { PASSWORD_HASH_SALT, USERS_REPOSITORY, USERS_SERVICE } from './typing'
import { User } from './entities'
import { UsersModuleOptions } from './typing'
import { UsersService, USERS_SERVICES } from './services'
import { USERS_SEEDS } from './seeders'

@Module({})
export class UsersModule {
	static options: UsersModuleOptions

	static getProviders() {
		return [
			{ provide: USERS_SERVICE, useClass: UsersService },
			{
				provide: PASSWORD_HASH_SALT,
				useValue: UsersModule.options.passwordHashSalt,
			},
			provideEntity(USERS_REPOSITORY, User),

			...USERS_SERVICES,
			...USERS_SEEDS,
		]
	}

	static getExports() {
		return [USERS_SERVICE, USERS_REPOSITORY]
	}

	static getImports() {
		return []
	}

	static forRoot(options: UsersModuleOptions): DynamicModule {
		UsersModule.options = options

		return {
			module: UsersModule,
			providers: UsersModule.getProviders(),
			imports: UsersModule.getImports(),
			exports: UsersModule.getExports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: UsersModule,
			providers: UsersModule.getProviders(),
			imports: UsersModule.getImports(),
			exports: UsersModule.getExports(),
		}
	}
}
