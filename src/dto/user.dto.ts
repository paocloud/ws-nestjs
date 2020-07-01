export class UserDto {
  constructor(object: any) {
    this.userId = object._id;
    this.fullname = object.fullname;
    this.lastname = object.lastname;
    this.nickname = object.nickname;
    this.username = object.username;
    this.email = object.email;
  };
  readonly userId: string;
  readonly fullname: string;
  readonly lastname: string;
  readonly nickname: string;
  readonly username: string;
  readonly email: string;
}