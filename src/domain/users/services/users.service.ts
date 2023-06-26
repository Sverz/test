import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import e from 'express'
import * as _ from 'lodash'
import { FindOptionsWhere } from 'typeorm'
import {
	CreateUserPayload,
	IUser,
	IUsersService,
	UpdateUserPayload,
	UserRole,
	USERS_REPOSITORY,
} from '../typing'
import { IUsersRepository } from '../typing'
import { UsersPasswordsService } from './users-passwords.service'

@Injectable()
export class UsersService implements IUsersService {
	@Inject(USERS_REPOSITORY) private readonly usersRepository: IUsersRepository
	constructor(private readonly usersPasswordsService: UsersPasswordsService) {}

	public async create(payload: CreateUserPayload) {
		const exist = await this.usersRepository.findOneBy({ email: payload.email })
		if (exist) throw new BadRequestException('User Already Exist')

		const passwordSalt = this.usersPasswordsService.createUserSalt()

		const password = await this.usersPasswordsService.hashPassword(
			payload.password,
			passwordSalt,
		)

		const user = await this.usersRepository.save({
			...payload,
			password,
			passwordSalt,
		})

		return user
	}

	public async update(id: number, payload: UpdateUserPayload) {
		let user = await this.usersRepository.findOne({ where: { id } })
		user = this.usersRepository.merge(user, _.omitBy(_.omit(payload), _.isNil))
		await this.usersRepository.update(id, user)
		return user
	}

	public async getOneByEmail(email: string) {
		return this.usersRepository.findOneBy({ email })
	}

	public async getOneBy(where: FindOptionsWhere<IUser> | FindOptionsWhere<IUser>[]) {
		return this.usersRepository.findOneBy(where)
	}

	public async compareUserPassword(userId: number, password: string) {
		return await this.usersPasswordsService.compareUserPasswords(userId, password)
	}
	public async getOneWithConnected(userId: number) {
		const user = await this.usersRepository.findOneBy({ id: userId })
		if (!user) throw new BadRequestException('User not found')
		if (user.role === UserRole.Admin) return await this.usersRepository.find()
		else if (user.role === UserRole.User) return user
		else {
			const userOfBoss = await this.usersRepository.findBy({ bossId: userId })
			return { ...user, userOfBoss }
		}
	}
	public async delete(id: number) {
		const userExist = await this.usersRepository.findOneBy({ id })
		if (!userExist) throw new BadRequestException('User not found')
		await this.usersRepository.delete(id)
	}
}
