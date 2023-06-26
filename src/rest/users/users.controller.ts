import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common'
import { AuthGuard } from 'src/domain/sessions/decorators'
import { RestUserService } from './users.service'
import { ReqUser } from 'src/shared'

@Controller('users')
export class RestUserController {
	constructor(private readonly userService: RestUserService) {}

	@AuthGuard()
	@Patch(':id')
	public getUsersList(
		@ReqUser() bossId: number,
		@Param('id') id: number,
		@Query('newBossId') newBossId: number,
	) {
		return this.userService.changeUsersBoss(bossId, id, newBossId)
	}

	@AuthGuard()
	@Get()
	public getUserInfo(@ReqUser() id: number) {
		return this.userService.getUserInfo(id)
	}
}
