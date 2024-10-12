import { ICustomer } from '@src/models/Customer';
import 'supertest';


declare module 'supertest' {

  export interface Response  {
    headers: Record<string, string[]>;
    body: {
      error: string;
      users: ICustomer[];
    };
  }
}