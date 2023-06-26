import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { IUsersService, UserRole, USERS_SERVICE } from 'src/domain/users/typing'

@Injectable()
export class RestUserService {
	@Inject(USERS_SERVICE) private readonly usersService: IUsersService

	public async getUserInfo(userId: number) {
		return await this.usersService.getOneWithConnected(userId)
	}

	public async changeUsersBoss(bossId: number, userId: number, newbossId: number) {
		const user = await this.usersService.getOneBy({ id: userId, bossId })
		if (!user) throw new BadRequestException('You aren`t boss of this user')
		const newBoss = await this.usersService.getOneBy({ id: newbossId, role: UserRole.Boss })
		if (!newBoss) throw new BadRequestException('Boss not found')
		return await this.usersService.update(userId, { bossId: newbossId })
	}
}
