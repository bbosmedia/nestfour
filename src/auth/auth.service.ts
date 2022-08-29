import { TokenDataDto } from './dto/token-data.dto'
import { LoginDto } from './dto/login.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Auth } from './auth.model'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { UserResponse } from './dto/user-response.dot'
import { ChangePasswordDto } from './dto/change-password.dto'
import { UdpateUserDto } from './dto/update-data.dto'

@Injectable()
export class AuthService {
	constructor(@InjectModel(Auth) private authRepisitory: typeof Auth, private readonly jwtService: JwtService) {}

	// Get All Users Data
	async getAllUsers() {
		const users = await this.authRepisitory.findAll({ include: { all: true } })
		return users
	}

	// Register User
	async createUser(dto: CreateUserDto): Promise<UserResponse> {
		const candidate = await this.authRepisitory.findOne({ where: { email: dto.email } })

		if (candidate) {
			throw new HttpException('User is already registered by the email', HttpStatus.BAD_REQUEST)
		}

		const hashPassword = await bcrypt.hash(dto.password, 10)

		const user = await this.authRepisitory.create({ ...dto, password: hashPassword })

		const token = this.generateToken(dto)
		const data = new UserResponse(user, token)

		return data
	}

	// Get User Info
	async userInfo(id: number): Promise<UserResponse> {
		const user = await this.authRepisitory.findOne({ where: { id: id } })

		if (!user) {
			throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
		}

		const token = this.generateToken(user)
		const data = new UserResponse(user, token)
		return data
	}

	// Login
	async login(dto: LoginDto): Promise<UserResponse> {
		const candidate = await this.authRepisitory.findOne({ where: { email: dto.email } })

		if (!candidate) {
			throw new HttpException('User is not found with this email', HttpStatus.NOT_FOUND)
		}

		const compare = await bcrypt.compare(dto.password, candidate.password)

		if (!compare) {
			throw new HttpException('Password or Email is wrong', HttpStatus.BAD_REQUEST)
		}

		const token = this.generateToken(candidate)

		const data = new UserResponse(candidate, token)

		return data
	}

	// Change Password
	async changeUserPassword(id: number, dto: ChangePasswordDto) {
		const user = await this.authRepisitory.findOne({ where: { id: id } })

		if (!user) {
			throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
		}

		const compare = await bcrypt.compare(dto.password, user.password)

		if (!compare) {
			throw new HttpException('Old password is wrong', HttpStatus.BAD_REQUEST)
		}

		if (dto.newPassword !== dto.confirmPassword) {
			throw new HttpException('New password and confirm password is not same', HttpStatus.BAD_REQUEST)
		}

		user.password = await bcrypt.hash(dto.newPassword, 10)

		await user.save()

		const token = this.generateToken(user)

		const data = new UserResponse(user, token)
		return data
	}

	// Update User Data
	async updateData(dto: UdpateUserDto, id: number): Promise<UserResponse> {
		const candidate = await this.authRepisitory.findOne({ where: { id: id } })

		if (!candidate) {
			throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
		}
		await this.authRepisitory.update({ ...dto }, { where: { id } })
		const user = await this.authRepisitory.findOne({ where: { id: id } })
		const token = this.generateToken(user)
		const data = new UserResponse(user, token)
		return data
	}

	// Delete User
	async deleteUser(id: number): Promise<string> {
		const candidate = await this.authRepisitory.findOne({ where: { id: id } })

		if (!candidate) {
			throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
		}
		try {
			await this.authRepisitory.destroy({ where: { id } })
			return 'User deleted successfully'
		} catch (e) {
			throw new HttpException('Something went wrongly', 500)
		}
	}

	// Generate Token
	generateToken(dto): string {
		const payload = { email: dto.email, name: dto.name, id: dto.id }

		const token = this.jwtService.sign(payload)
		return token
	}

	// Verify Token
	verifyToken(token): TokenDataDto {
		try {
			const data = this.jwtService.verify(token)
			return data
		} catch (e) {
			throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED)
		}
	}
}
