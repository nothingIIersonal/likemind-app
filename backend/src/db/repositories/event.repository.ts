import { ResultSetHeader } from 'mysql2';
import connection from '@db/db.module';
import IEvent, { Event } from '@models/event.model';

interface IEventRepository {
  save(event: Event): Promise<IEvent | undefined>;
  retrieveAll(): Promise<IEvent[]>;
  update(event: Event): Promise<number>;
  delete(eventId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class EventRepository implements IEventRepository {
  save(event: Event): Promise<IEvent | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        'INSERT INTO events (title, lat, lon, limited) VALUES(?,?,?,?)',
        [event.title, event.lat, event.lon, event.limited],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((event) => resolve(event!))
              .catch(() => reject(undefined));
        },
      );
    });
  }

  retrieveAll(): Promise<IEvent[]> {
    return new Promise((resolve, reject) => {
      connection.query<IEvent[]>('SELECT * FROM events', (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(eventId: number): Promise<IEvent | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<IEvent[]>(
        'SELECT * FROM events WHERE event_id = ?',
        [eventId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        },
      );
    });
  }

  update(event: Event): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        'UPDATE events SET title = ?, lat = ?, lon = ?, updated_at = ?, limited = ?, max_members = ?, description = ? WHERE event_id = ?',
        [
          event.title,
          event.lat,
          event.lon,
          Date(),
          event.limited,
          event.max_members,
          event.description,
        ],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        },
      );
    });
  }

  delete(eventId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        'DELETE FROM events WHERE event_id = ?',
        [eventId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        },
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>('DELETE FROM events', (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new EventRepository();
