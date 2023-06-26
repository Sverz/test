import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { PASSWORD_HASH_SALT, USERS_REPOSITORY } from '../typing'
import { IUsersRepository } from '../typing'
import * as bcrypt from 'bcryptjs'
import * as randomstring from 'randomstring'

@Injectable()
export class UsersPasswordsService {
	private readonly saltRounds = 10

	@Inject(PASSWORD_HASH_SALT)
	private localHashSalt: string
	@Inject(USERS_REPOSITORY) private readonly usersRepository: IUsersRepository

	public async compareUserPasswords(userId: number, password: string) {
		const user = await this.findOneWithPassword(userId)
		return this.comparePass(password, user.passwordSalt, user.password)
	}

	private async findOneWithPassword(userId: number) {
		const user = await this.usersRepository.findOne({
			where: { id: userId },
			select: ['id', 'password', 'passwordSalt'],
		})

		if (!user) throw new BadRequestException('User not found')

		return user
	}

	public async hashPassword(password: string, salt: string): Promise<string> {
		return bcrypt.hash(this.getSalt(salt) + password, this.saltRounds)
	}

	private async comparePass(password: string, salt: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(this.getSalt(salt) + password, hash)
	}

	public createUserSalt(): string {
		return randomstring.generate(10)
	}

	private getSalt(userSalt: string): string {
		return this.localHashSalt + userSalt
	}
}
