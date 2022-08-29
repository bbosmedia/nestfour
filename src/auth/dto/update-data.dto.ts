import { IsString, IsEmail, IsNumber, Max, Min } from 'class-validator'

export class UdpateUserDto {
	@IsString({ message: 'Email must be string' })
	@IsEmail({}, { message: 'It is not valid email address' })
	readonly email: string

	@IsString({ message: 'Name must be string' })
	readonly name: string

	@IsString({ message: 'Surname must be string' })
	readonly surname: string

	@IsNumber({}, { message: 'Age must be number' })
	@Min(16, { message: 'Age must be greater than 16' })
	readonly age: number

	@IsNumber({}, { message: 'Birth year must be number' })
	@Min(1850, { message: 'It is not valid birth year.' })
	@Max(2006, { message: 'The year of birth must be earlier than 2006' })
	readonly birth_year: number

	@IsString({ message: 'It is not valid city name' })
	readonly birth_city: string

	@IsString({ message: 'It is not valid country name' })
	readonly birth_country: string
}
