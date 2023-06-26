import { UserRole } from 'src/domain/users/typing'

export interface ICreateTokenPayload {
	id: number | string
	expiresIn?: string
	role?: string
	roles?: UserRole[]
	sessionId?: number
}
