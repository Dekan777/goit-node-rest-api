import express from 'express';

const authRouter = express.Router();
import validateBody from '../middlewares/validateBody.js';
import { userSignupSchema } from '../schemas/usersSchemas.js';
import authControllers from '../controllers/authControllers.js';


//signup
authRouter.post(
    '/register', validateBody(userSignupSchema), authControllers.signup
);


authRouter.post(
    '/login'
);




export default authRouter;