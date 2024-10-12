import { ICustomer } from '@src/models/Customer';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';

// **** Functions **** //

/**
 * Get one customer.
 */
async function getOne(email: string): Promise<ICustomer | null> {
  const db = await orm.openDb();
  for (const customer of db.customers) {
    if (customer.email === email) {
      return customer;
    }
  }
  return null;
}

/**
 * See if a customer with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const customer of db.customers) {
    if (customer.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all customers.
 */
async function getAll(): Promise<ICustomer[]> {
  const db = await orm.openDb();
  return db.customers;
}

/**
 * Add one customer.
 */
async function add(customer: ICustomer): Promise<void> {
  const db = await orm.openDb();
  customer.id = getRandomInt();
  db.customers.push(customer);
  return orm.saveDb(db);
}

/**
 * Update a customer.
 */
async function update(customer: ICustomer): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.customers.length; i++) {
    if (db.customers[i].id === customer.id) {
      const dbcustomer = db.customers[i];
      db.customers[i] = {
        ...dbcustomer,
        name: customer.name,
        email: customer.email,
      };
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one customer.
 */
async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.customers.length; i++) {
    if (db.customers[i].id === id) {
      db.customers.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}

// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
