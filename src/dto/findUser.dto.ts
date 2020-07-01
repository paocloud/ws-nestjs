import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum findKey {
  username = 'username',
  email = 'email',
  id = 'id',
}

export class FindUserDto {
	
	@IsNotEmpty()
	@ApiProperty({
		description: "Find by key",
		type: String,
		enum: findKey
	})
	findby: string;

	@IsNotEmpty()
	@ApiProperty({
		description: "Value",
		type: String,
		example: "alex"
	})
	value: string;
}