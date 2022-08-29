import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService) {}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest()
		const headers = req.headers
		const auth = headers.authorization
		if (!auth) {
			throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED)
		}
		const bearer = auth.split(' ')[0]
		const token = auth.split(' ')[1]
		if (!bearer || bearer !== 'Bearer' || !token) {
			throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED)
		}

		const tokenData = this.authService.verifyToken(token)
		req.userId = tokenData.id

		return true
	}
}
