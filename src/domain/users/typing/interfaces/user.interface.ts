import { UserRole } from '../enums'

export interface IUser {
	id: number
	role: UserRole
	email: string
	name: string
	password: string
	passwordSalt: string
	bossId?: number
	createdAt: string
	updatedAt: string
}
