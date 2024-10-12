const Base = 'customers';

export const Customers = {
  Base: '/',
  Get: Base,
  Add: Base,
  Update: `${Base}/:id`,
  Delete: `${Base}/:id`,
};
