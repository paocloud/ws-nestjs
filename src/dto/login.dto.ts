import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
	
	@IsNotEmpty()
	@ApiProperty({
		description: "Your username",
		type: String,
	})
	username: string;

	@IsNotEmpty()
	@ApiProperty({
		description: "Your password",
		type: String,
	})
	password: string;
}