import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../middlewares/ctrlWrapper.js';
import bcrypt from 'bcrypt';


const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });

    if (user) {
        throw HttpError(409, 'Email in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await authServices.signup({
        ...req.body,
        password: hashPassword,
    });

    res.status(201).json({
        user: newUser,
    });
};

export default {
    signup: ctrlWrapper(signup)

};