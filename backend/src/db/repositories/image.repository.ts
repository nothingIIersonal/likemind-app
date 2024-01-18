import { ResultSetHeader } from 'mysql2';
import connection from '@db/db.module';
import IImage, { Image } from '@models/image.model';

interface IImageRepository {
  save(image: Image): Promise<IImage | undefined>;
  retrieveAll(): Promise<IImage[]>;
  update(image: Image): Promise<number>;
  delete(imageId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class ImageRepository implements IImageRepository {
  save(image: Image): Promise<IImage | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        'INSERT INTO images (user_id, URN, is_deleted) VALUES(?,?,?)',
        [image.user_id, image.URN, image.is_deleted],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((image) => resolve(image!))
              .catch(() => reject(undefined));
        },
      );
    });
  }

  retrieveAll(): Promise<IImage[]> {
    return new Promise((resolve, reject) => {
      connection.query<IImage[]>('SELECT * FROM images', (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveByUserId(userId: number): Promise<IImage[]> {
    return new Promise((resolve, reject) => {
      connection.query<IImage[]>(
        'SELECT * FROM images WHERE user_id = ?',
        [userId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        },
      );
    });
  }

  retrieveById(imageId: number): Promise<IImage | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<IImage[]>(
        'SELECT * FROM images WHERE image_id = ?',
        [imageId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        },
      );
    });
  }

  update(image: Image): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        'UPDATE images SET user_id = ?, URN = ?, is_deleted = ? WHERE image_id = ?',
        [image.user_id, image.URN, image.is_deleted],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        },
      );
    });
  }

  delete(imageId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        'DELETE FROM images WHERE image_id = ?',
        [imageId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        },
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>('DELETE FROM images', (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new ImageRepository();
