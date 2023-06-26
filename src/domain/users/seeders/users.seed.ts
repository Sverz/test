import { Injectable } from '@nestjs/common'
import { Seeder } from 'src/shared'
import { UsersService } from '../services/users.service'
import { UserRole } from '../typing'
import { noop } from 'lodash'

@Injectable()
export class UsersSeed extends Seeder {
	protected name = 'Admin user'

	constructor(private readonly usersService: UsersService) {
		super()
	}
	protected async seed(): Promise<void> {
		console.log('USER SEED START')

		await this.usersService
			.create({
				name: 'Admin',
				email: 'admin@admin.com',
				password: '123qqq',
				role: UserRole.Admin,
			})
			.catch(noop)
	}
}
