import { CreateUserDto } from './dto/create-user.dto'
import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserResponse } from './dto/user-response.dot'
import { LoginDto } from './dto/login.dto'
import { AuthGuard } from './auth.guard'
import { ChangePasswordDto } from './dto/change-password.dto'
import { UdpateUserDto } from './dto/update-data.dto'

@Controller('api/auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	// Get All Users Data
	@UseGuards(AuthGuard)
	@Get('users')
	getUsers() {
		return this.authService.getAllUsers()
	}

	// Get User Data
	@UseGuards(AuthGuard)
	@Get('user')
	getUser(@Req() req) {
		return this.authService.userInfo(req.userId)
	}

	// Register User
	@Post('register')
	@UsePipes(ValidationPipe)
	userRegister(@Body() body: CreateUserDto): Promise<UserResponse> {
		return this.authService.createUser(body)
	}

	// Login User
	@Post('login')
	@UsePipes(ValidationPipe)
	loginUser(@Body() dto: LoginDto): Promise<UserResponse> {
		return this.authService.login(dto)
	}

	// Change Candidate Password
	@UseGuards(AuthGuard)
	@Post('update-password')
	@UsePipes(ValidationPipe)
	changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
		return this.authService.changeUserPassword(req.userId, dto)
	}

	@UseGuards(AuthGuard)
	@Post('update')
	@UsePipes(ValidationPipe)
	updateUserData(@Req() req, @Body() dto: UdpateUserDto): Promise<UserResponse> {
		return this.authService.updateData(dto, req.userId)
	}

	// Delete Account
	@UseGuards(AuthGuard)
	@Post('delete')
	deleteAccount(@Req() req): Promise<String> {
		return this.authService.deleteUser(req.userId)
	}
}
