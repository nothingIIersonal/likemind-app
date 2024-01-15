import { RowDataPacket } from 'mysql2';

export default interface IEvent extends RowDataPacket {
  id?: number;
  title?: string;
  lat?: number;
  lon?: number;
  created_at?: string;
  updated_at?: string;
  limited?: number;
  max_members?: number;
  description?: string;
}

export class Event {
  id?: number;
  title?: string;
  lat?: number;
  lon?: number;
  created_at?: string;
  updated_at?: string;
  limited?: number;
  max_members?: number;
  description?: string;

  constructor(
    id: number,
    title: string,
    lat: number,
    lon: number,
    created_at: string,
    updated_at: string,
    limited: number,
    max_members: number,
    description: string,
  ) {
    this.id = id;
    this.title = title;
    this.lat = lat;
    this.lon = lon;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.limited = limited;
    this.max_members = max_members;
    this.description = description;
  }
}
