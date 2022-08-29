import { Column, DataType, Model, Table } from 'sequelize-typescript'

interface AuthDto {
	email: string
	password: string
}

@Table({ tableName: 'users' })
export class Auth extends Model<Auth, AuthDto> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string

	@Column({ type: DataType.STRING, allowNull: false })
	password: number

	@Column({ type: DataType.STRING, allowNull: false })
	name: string

	@Column({ type: DataType.STRING, allowNull: false })
	surname: string

	@Column({ type: DataType.INTEGER, allowNull: false })
	age: number

	@Column({ type: DataType.STRING, allowNull: false })
	birth_city: string

	@Column({ type: DataType.STRING, allowNull: false })
	birth_country: string

	@Column({ type: DataType.INTEGER, allowNull: false })
	birth_year: number
}
