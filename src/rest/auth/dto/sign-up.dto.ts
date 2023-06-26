import { UserRole } from 'src/domain/users/typing'
import { IsEmail, IsNotEmpty, IsEmpty } from 'class-validator'
import { DtoProperty, DtoPropertyOptional } from 'src/shared'
export class SignUpPayloadDto {
	@DtoProperty()
	@IsEmail()
	email: string

	@DtoProperty()
	@IsNotEmpty()
	name: string 

	@DtoProperty()
	@IsNotEmpty()
	password: string

	@DtoProperty()
	@IsNotEmpty()
	role: UserRole

	@DtoPropertyOptional()
	bossId?: number
}
