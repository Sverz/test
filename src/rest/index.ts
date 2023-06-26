import { RestAuthModule } from './auth/auth.module'
import { RestUserModule } from './users/users.module'

export const getRestModules = () => [
	RestAuthModule.forRoot(),
	RestUserModule.forRoot(),
]
