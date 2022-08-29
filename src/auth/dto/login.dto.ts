import { IsString, IsEmail, Length } from 'class-validator'

export class LoginDto {
	@IsString({ message: 'Email must be string' })
	@IsEmail({}, { message: 'It is not valid email address' })
	readonly email: string

	@IsString({ message: 'Password string' })
	@Length(6, 36, { message: 'Password length must be from 6 to 36' })
	readonly password: string
}
