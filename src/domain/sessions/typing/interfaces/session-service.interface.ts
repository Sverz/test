import { UserRole } from 'src/domain/users/typing'
import { ISession } from './session.interface'
import { ITokenPair } from './token-pair.interface'

export interface IStartSessionPayload {
	userId: number
	role?: UserRole
}

export interface ISessionsService {
	start(payload: IStartSessionPayload): Promise<ISession>

	getByUserId(userId: number): Promise<ISession[]>
}
