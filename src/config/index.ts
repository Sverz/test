import { DatabaseModule } from 'src/libs'
import { getEnv, stringToBoolean } from 'src/shared'
import { ENTITIES } from './entities.config'

const getDatabaseConfig = (): Parameters<(typeof DatabaseModule)['forRoot']> => {
	return [
		{
			type: 'postgres',
			host: process.env.DATABASE_HOST,
			port: Number(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASS,
			database: process.env.DATABASE_DB,
			synchronize: true,
		},
		ENTITIES,
	]
}


const getJwtConfig = () => {
	return { jwtKey: getEnv('JWT_KEY'), payloadKey: getEnv('JWT_PAYLOAD_KEY') }
}

export const $config = {
	getDatabaseConfig,
	getJwtConfig,
}
