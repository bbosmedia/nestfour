import { IsString,Length } from 'class-validator'

export class ChangePasswordDto{
    @IsString({ message: 'Password string' })
	@Length(6, 36, { message: 'Password length must be from 6 to 36' })
    readonly password;

    @IsString({ message: 'New Password string' })
	@Length(6, 36, { message: 'New Password length must be from 6 to 36' })
    readonly newPassword;

    @IsString({ message: 'Confirm Password string' })
	@Length(6, 36, { message: 'Confirm Password length must be from 6 to 36' })
    readonly confirmPassword;
}