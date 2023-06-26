import { Module } from '@nestjs/common'
import { $config } from './config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { SessionsModule, UsersModule } from './domain'
import { DatabaseModule, JwtModule } from './libs'
import { getRestModules } from './rest'
import { getEnv } from './shared'

const imports = [
	EventEmitterModule.forRoot(),
	DatabaseModule.forRoot(...$config.getDatabaseConfig()),
	JwtModule.forRoot($config.getJwtConfig()),
	UsersModule.forRoot({ passwordHashSalt: getEnv('LOCAL_HASH_SALT') }),
	SessionsModule.forRoot(),
	...getRestModules(),
]

@Module({ imports })
export class AppModule {}
