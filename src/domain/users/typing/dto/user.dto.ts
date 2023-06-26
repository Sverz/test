import { UserRole } from '../enums'

export class UserDto {
	id: number
	email: string
	name: string
	role: UserRole
	bossId: number
	createdAt: string
	updatedAt: string
}
