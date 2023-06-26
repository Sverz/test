import { IsEmail, IsNotEmpty } from 'class-validator'
import { DtoProperty } from 'src/shared'
export class LoginPayloadDto {
	@DtoProperty()
	@IsEmail()
	email: string
	@DtoProperty()
	@IsNotEmpty()
	password: string
}
