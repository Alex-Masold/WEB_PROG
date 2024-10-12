import { IReq, IRes } from './common/types';
import UserService from '@src/services/UserService';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import User from '@src/models/User';
import check from './common/check';

async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  res.status(HttpStatusCodes.OK).json({ users });
}

async function add(req: IReq, res: IRes) {
  const user = check.isValid(req.body, 'user', User.is);
  await UserService.addOne(user);
  res.status(HttpStatusCodes.CREATED).end();
}

async function update(req: IReq, res: IRes) {
  const user = check.isValid(req.body, 'user', User.is);
  await UserService.updateOne(user);
  res.status(HttpStatusCodes.OK).end();
}

async function delete_(req: IReq, res: IRes) {
  const id = check.isNum(req.params, 'id');
  await UserService.delete(id);
  res.status(HttpStatusCodes.OK).end();
}
export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
