import { RowDataPacket } from 'mysql2';

export default interface IImage extends RowDataPacket {
  id?: number;
  user_id?: number;
  URN?: string;
  created_at?: string;
  is_deleted?: number;
}

export class Image {
  id?: number;
  user_id?: number;
  URN?: string;
  created_at?: string;
  is_deleted?: number;

  constructor(
    id?: number,
    user_id?: number,
    URN?: string,
    created_at?: string,
    is_deleted?: number,
  ) {
    this.id = id;
    this.user_id = user_id;
    this.URN = URN;
    this.created_at = created_at;
    this.is_deleted = is_deleted;
  }
}
