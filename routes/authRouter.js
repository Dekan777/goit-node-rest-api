import express from 'express';

const authRouter = express.Router();
import validateBody from '../middlewares/validateBody.js';
import { userSignupSchema, userSigninSchema, emailSchemas } from '../schemas/usersSchemas.js';
import authControllers from '../controllers/authControllers.js';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';
import emailControllers from '../controllers/emailControllers.js';


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

authRouter.get('/current', authenticate, authControllers.getCurrent);

authRouter.post('/logout', authenticate, authControllers.signout);

authRouter.patch(
    '/avatars',
    upload.single('avatar'),
    authenticate,
    authControllers.updateAvatar
);


authRouter.post(
    '/verify',
    validateBody(emailSchemas),
    emailControllers.resendVerifyEmail
);

authRouter.get('/verify/:verificationToken', emailControllers.verifyEmail);

export default authRouter;