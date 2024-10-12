import { IUser } from '@src/models/User';
import orm from './MockOrm';
import { getRandomInt } from '@src/util/misc';

async function getOne(id: number): Promise<IUser | null> {
  const db = await orm.openDb();
  for (const user of db.users) {
    if (user.id === id) {
      return user;
    }
  }
  return null;
}

async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const user of db.users) {
    if (user.id === id) {
      return true;
    }
  }
  return false;
}

async function getAll(): Promise<IUser[]> {
  const db = await orm.openDb();
  return db.users;
}

async function add(user: IUser): Promise<void> {
  const db = await orm.openDb();
  user.id = getRandomInt();
  db.users.push(user);
  return orm.saveDb(db);
}

async function update(user: IUser): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === user.id) {
      const dbuser = db.users[i];
      db.users[i] = {
        ...dbuser,
        name: user.name,
      };
      return orm.saveDb(db);
    }
  }
}

async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === id) {
      db.users.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
