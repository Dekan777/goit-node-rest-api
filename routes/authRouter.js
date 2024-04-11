import express from 'express';

const authRouter = express.Router();

//signup
authRouter.post(
    '/register'
);


authRouter.post(
    '/login'
);




export default authRouter;