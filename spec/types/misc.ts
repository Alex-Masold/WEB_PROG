import { Response } from 'supertest';
import { ICustomer } from '@src/models/Customer';


// Misc
export type TReqBody = Record<string, unknown>;
export type TRes = Omit<Response, 'body'> & { body: {
  error?: string;
  user?: ICustomer
  users?: ICustomer[]
}};
export type TApiCb = (res: TRes) => void;
