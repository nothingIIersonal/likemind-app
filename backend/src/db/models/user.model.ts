import { RowDataPacket } from 'mysql2';

export default interface IUser extends RowDataPacket {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

export class User {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    created_at: string,
    updated_at: string,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
