export class UserResponse {
	email
	name
	surname
	age
	birth_year
	birth_city
	birth_country
	token
	constructor(user, token) {
		this.email = user.email
		this.name = user.name
		this.surname = user.surname
		this.age = user.age
		this.birth_year = user.birth_year
		this.birth_city = user.birth_city
		this.birth_country = user.birth_country
        this.token = token
	}
}
