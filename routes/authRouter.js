import express from 'express';

const authRouter = express.Router();
import validateBody from '../middlewares/validateBody.js';
import { userSignupSchema, userSigninSchema } from '../schemas/usersSchemas.js';
import authControllers from '../controllers/authControllers.js';



//signup
authRouter.post(
    '/register', validateBody(userSignupSchema), authControllers.signup
);

//signin
authRouter.post(
    '/login',
    validateBody(userSigninSchema),
    authControllers.signin
);




export default authRouter;