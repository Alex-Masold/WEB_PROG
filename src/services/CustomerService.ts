import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import CustomerRepo from '@src/repos/CustomerRepo';
import { ICustomer } from '@src/models/Customer';


// **** Variables **** //

export const CUSTOMER_NOT_FOUND_ERR = 'Customer not found';

// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<ICustomer[]> {
  return CustomerRepo.getAll();
}

/**
 * Add one user.
 */
function addOne(customer: ICustomer): Promise<void> {
  return CustomerRepo.add(customer);
}

/**
 * Update one user.
 */
async function updateOne(customer: ICustomer): Promise<void> {
  const persists = await CustomerRepo.persists(customer.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      CUSTOMER_NOT_FOUND_ERR,
    );
  }
  // Return user
  return CustomerRepo.update(customer);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await CustomerRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      CUSTOMER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return CustomerRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
