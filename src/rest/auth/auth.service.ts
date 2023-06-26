import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { LoginPayloadDto, SignUpPayloadDto } from './dto'
import * as _ from 'lodash'
import { ISessionsService, SESSIONS_SERVICE } from 'src/domain/sessions/typing'
import { IUsersService, UserRole, USERS_SERVICE } from 'src/domain/users/typing'

@Injectable()
export class AuthService {
	@Inject(USERS_SERVICE) private readonly usersService: IUsersService
	@Inject(SESSIONS_SERVICE) private readonly sessionsService: ISessionsService

	constructor() {}
	public async signUp(dto: SignUpPayloadDto) {
		const boss = await this.usersService.getOneBy({ id: dto.bossId, role: UserRole.Boss })
		if (dto.role === UserRole.User && !boss)
			throw new BadRequestException('Insert correct boss number')
		let user = await this.usersService.create(dto)
		const session = await this.sessionsService.start({
			userId: user.id,
			role: user.role,
		})

		return { accessToken: session.accessToken, refreshToken: session.refreshToken }
	}
	public async signIn(dto: LoginPayloadDto) {
		const user = await this.usersService.getOneByEmail(dto.email)
		if (!user) throw new BadRequestException('Invalid Credentials')
		const isCorrect = await this.usersService.compareUserPassword(user.id, dto.password)
		if (!isCorrect) throw new BadRequestException('Invalid Credentials')

		const session = await this.sessionsService.start({
			userId: user.id,
			role: user.role,
		})

		return { accessToken: session.accessToken, refreshToken: session.refreshToken }
	}
}
