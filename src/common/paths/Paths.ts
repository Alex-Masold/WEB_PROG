/**
 * Express router paths go here.
 */

import { Customers } from '@src/common/paths/customerPath';
import { Users } from '@src/common/paths/userPath';

export default {
  Base: '/api',
  Customers,
  Users,
} as const;
