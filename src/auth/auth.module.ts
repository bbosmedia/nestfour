import { SequelizeModule } from '@nestjs/sequelize'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { Auth } from './auth.model'
import { JwtModule } from '@nestjs/jwt'

@Module({
	imports: [SequelizeModule.forFeature([Auth]), JwtModule.register({
    secret: process.env.PRIVATE_KEY || 'SECRET',
    signOptions: {
      expiresIn: '5d',
    },
  }),],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
