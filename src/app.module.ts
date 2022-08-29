import { Auth } from './auth/auth.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			models: [Auth],
			autoLoadModels: true,
		}),
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
