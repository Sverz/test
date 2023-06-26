import { Body, Controller, Post } from '@nestjs/common'
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TokenPairDto } from 'src/domain/sessions/typing'
import { AuthService } from './auth.service'
import { LoginPayloadDto } from './dto'
import { SignUpPayloadDto } from './dto/sign-up.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'User SignUp' })
	@ApiBody({ type: LoginPayloadDto })
	@ApiResponse({
		status: 201,
		description: 'Start session, returns access and refresh tokens',
		type: TokenPairDto,
	})
	@ApiBadRequestResponse({
		description: 'Invalid credentials',
	})
	@Post('/sign-up')
	public async signUp(@Body() dto: SignUpPayloadDto) {
		return await this.authService.signUp(dto)
	}
	
	@ApiOperation({ summary: 'User SignUp' })
	@ApiBody({ type: LoginPayloadDto })
	@ApiResponse({
		status: 201,
		description: 'Start session, returns access and refresh tokens',
		type: TokenPairDto,
	})
	@ApiBadRequestResponse({
		description: 'Invalid credentials',
	})
	@Post('/sign-in')
	public async signIn(@Body() dto: LoginPayloadDto) {
		return await this.authService.signIn(dto)
	}
}
