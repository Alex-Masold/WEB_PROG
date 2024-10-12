import { Router } from 'express';

import Paths from '../common/paths/Paths';
import CustomerRoutes from './CustomerRoutes';
import UserRoutes from './UserRoutes';


// **** Variables **** //

const apiRouter = Router();


// ** Add UserRouter ** //

// Init router
const customerRouter = Router();
const userRouter = Router();

customerRouter.get(Paths.Customers.Get, CustomerRoutes.getAll);
customerRouter.post(Paths.Customers.Add, CustomerRoutes.add);
customerRouter.patch(Paths.Customers.Update, CustomerRoutes.update);
customerRouter.delete(Paths.Customers.Delete, CustomerRoutes.delete);

userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.patch(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

// Add UserRouter
apiRouter.use(Paths.Customers.Base, customerRouter);
apiRouter.use(Paths.Users.Base, userRouter);

// **** Export default **** //

export default apiRouter;
