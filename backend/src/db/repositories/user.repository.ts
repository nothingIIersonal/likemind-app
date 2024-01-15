import { ResultSetHeader } from 'mysql2';
import connection from '@db/db.module';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import IUser, { User } from '@models/user.model';

interface IUserRepository {
  save(user: User): Promise<IUser | undefined>;
  retrieveAll(searchParams: {
    username: string;
    email: string;
  }): Promise<IUser[]>;
  retrieveById(userId: number): Promise<IUser | undefined>;
  retrieveByUsername(username: string): Promise<IUser | undefined>;
  retrieveByEmail(email: string): Promise<IUser | undefined>;
  update(user: User): Promise<number>;
  delete(userId: number): Promise<number>;
  deleteAll(): Promise<number>;

  existsByUsername(username: string): Promise<IUser | undefined>;
  existsByEmail(username: string): Promise<IUser | undefined>;
  passwordCheckByUsername(
    username: string,
    password: string,
  ): Promise<IUser | undefined>;
  passwordCheckByEmail(
    username: string,
    password: string,
  ): Promise<IUser | undefined>;
}

class UserRepository implements IUserRepository {
  save(user: User): Promise<IUser | undefined> {
    const hashedPassword = hashSync(user.password, genSaltSync(10));

    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        'INSERT INTO users (username, email, password) VALUES(?,?,?)',
        [user.username, user.email, hashedPassword],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((user) => resolve(user!))
              .catch(() => reject(undefined));
        },
      );
    });
  }

  retrieveAll(searchParams: {
    username?: string;
    email?: string;
  }): Promise<IUser[]> {
    let query: string = 'SELECT * FROM users';
    let condition: string = '';

    if (searchParams?.username) {
      condition += `username = ${searchParams.username}`;
      if (searchParams?.email) {
        condition += `OR email = ${searchParams.email}%'`;
      }
    } else if (searchParams?.email) {
      condition += `email = ${searchParams.email}'`;
    }

    if (condition.length) query += ' WHERE ' + condition;

    return new Promise((resolve, reject) => {
      connection.query<IUser[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(userId: number): Promise<IUser | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<IUser[]>(
        'SELECT * FROM users WHERE user_id = ?',
        [userId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        },
      );
    });
  }

  retrieveByUsername(username: string): Promise<IUser | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<IUser[]>(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        },
      );
    });
  }

  retrieveByEmail(email: string): Promise<IUser | undefined> {
    return new Promise((resolve, reject) => {
      connection.query<IUser[]>(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        },
      );
    });
  }

  update(user: User): Promise<number> {
    const hashedPassword = hashSync(user.password, genSaltSync(10));

    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        'UPDATE user SET username = ?, email = ?, password = ?, updated_at = ?, firstname = ?, about = ?, sex = ? WHERE user_id = ?',
        [
          user.username,
          user.email,
          hashedPassword,
          Date(),
          user.firstname,
          user.about,
          user.sex,
          user.id,
        ],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        },
      );
    });
  }

  delete(userId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        'DELETE FROM user WHERE user_id = ?',
        [userId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        },
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>('DELETE FROM users', (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }

  existsByUsername(username: string): Promise<IUser | undefined> {
    const query: string = `SELECT * FROM users WHERE username = '${username}'`;

    return new Promise((resolve, reject) => {
      connection.query<IUser[]>(query, (err, res) => {
        if (err) reject(err);
        else if (res && res[0])
          this.retrieveByUsername(res[0].username)
            .then((user) => resolve(user!))
            .catch(() => reject(undefined));
        else reject(undefined);
      });
    });
  }

  existsByEmail(email: string): Promise<IUser | undefined> {
    const query: string = `SELECT * FROM users WHERE email = '${email}'`;

    return new Promise((resolve, reject) => {
      connection.query<IUser[]>(query, (err, res) => {
        if (err) reject(err);
        else if (res && res[0])
          this.retrieveByEmail(res[0].email)
            .then((user) => resolve(user!))
            .catch(() => reject(undefined));
        else reject(undefined);
      });
    });
  }

  passwordCheckByUsername(
    username: string,
    password: string,
  ): Promise<IUser | undefined> {
    return new Promise(async (resolve, reject) => {
      const user: IUser | undefined = await this.existsByUsername(username)
        .then((user) => {
          return user;
        })
        .catch(() => {
          return undefined;
        });

      if (user === undefined || !compareSync(password, user.password)) {
        reject(undefined);
      } else {
        resolve(user);
      }
    });
  }

  passwordCheckByEmail(
    email: string,
    password: string,
  ): Promise<IUser | undefined> {
    return new Promise(async (resolve, reject) => {
      const user: IUser | undefined = await this.existsByEmail(email)
        .then((user) => {
          return user;
        })
        .catch(() => {
          return undefined;
        });

      if (user === undefined || !compareSync(password, user.password)) {
        reject(undefined);
      } else {
        resolve(user);
      }
    });
  }
}

export default new UserRepository();
