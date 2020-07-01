import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@IsNotEmpty()
	@ApiProperty({
		description: "Your fullname",
		type: String
	})
	fullname: string;
	
	@IsNotEmpty()
	@ApiProperty({
		description: "Your lastname",
		type: String
	})
	lastname: string;

	@IsNotEmpty()
	@ApiProperty({
		description: "Your nickname",
		type: String
	})
	nickname: string;

	@IsNotEmpty()
	@ApiProperty({
		description: "Your username and not same other user.",
		type: String
	})
	username: string;

	@IsNotEmpty()
	@ApiProperty({
		description: "Your STRONG!! Password",
		type: String
	})
	password: string;

	@IsEmail()
	@ApiProperty({
		description: "Your Email Address",
		type: String
	})
	email: string;
}