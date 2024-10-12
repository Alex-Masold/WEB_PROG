import { Router } from 'express';

import Paths from '../common/paths/Paths';
import UserRoutes from './CustomerRoutes';


// **** Variables **** //

const apiRouter = Router();


// ** Add UserRouter ** //

// Init router
const userRouter = Router();

userRouter.get(Paths.Customers.Get, UserRoutes.getAll);
userRouter.post(Paths.Customers.Add, UserRoutes.add);
userRouter.put(Paths.Customers.Update, UserRoutes.update);
userRouter.delete(Paths.Customers.Delete, UserRoutes.delete);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);


// **** Export default **** //

export default apiRouter;
