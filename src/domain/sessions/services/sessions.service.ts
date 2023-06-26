import { Inject, Injectable } from '@nestjs/common'
import * as _ from 'lodash'
import { UserRole } from 'src/domain/users/typing'
import { JwtService } from 'src/libs/jwt/services'
import {
	ISession,
	ISessionsRepository,
	ISessionsService,
	IStartSessionPayload,
	SESSIONS_REPOSITORY,
} from '../typing'

@Injectable()
export class SessionsService implements ISessionsService {
	@Inject(SESSIONS_REPOSITORY) private readonly sessionsRepository: ISessionsRepository

	constructor(private readonly jwtService: JwtService) {}

	public async start(payload: IStartSessionPayload) {
		const session: ISession = {
			accessToken: ' ',
			refreshToken: ' ',
			userId: payload.userId,
		}
		const resultInsert = await this.sessionsRepository.insert(session)
		const sessionId = resultInsert.identifiers[0].id

		const tokens = this.generateTokens(payload.userId, payload.role, sessionId)

		await this.sessionsRepository.update(sessionId, tokens)

		return {
			...session,
			...tokens,
		}
	}

	public async getByUserId(userId: number) {
		return await this.sessionsRepository.findBy({ userId })
	}

	private generateTokens(userId: number, role: UserRole, sessionId: number) {
		return {
			accessToken: this.jwtService.createToken({ id: userId, role, sessionId }),
			refreshToken: this.jwtService.createToken({
				id: `_${userId}`,
				role,
				sessionId,
				expiresIn: null,
			}),
		}
	}
}
