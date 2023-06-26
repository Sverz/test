import { FindOptionsWhere } from 'typeorm'
import { UserRole } from '../enums'
import { IUser } from './user.interface'

export interface CreateUserPayload {
	role?: UserRole
	email?: string
	password?: string
	name?: string
	bossId?: number
}

export interface UpdateUserPayload {
	bossId?: number
}

export interface IUsersService {
	create(payload: CreateUserPayload): Promise<IUser>
	update(id: number, payload: UpdateUserPayload): Promise<IUser>
	delete(id: number)
	getOneByEmail(email: string): Promise<IUser>
	getOneBy(where: FindOptionsWhere<IUser> | FindOptionsWhere<IUser>[]): Promise<IUser>
	compareUserPassword(userId: number, password: string): Promise<boolean>
	getOneWithConnected(userId: number)
}
