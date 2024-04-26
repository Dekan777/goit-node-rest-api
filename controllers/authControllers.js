import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../middlewares/ctrlWrapper.js';
import * as authServices from '../services/authServices.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import fs from 'fs/promises';
import path from 'path';
import gravatar from 'gravatar';
import Jimp from 'jimp';
import { nanoid } from 'nanoid';
import sendEmail from '../helpers/sendlerEmail.js';


const { JWT_SECRET, PROJECT_URL } = process.env;

const avatarsPath = path.resolve('public', 'avatars');

const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Проверка наличия пользователя с этим электронным письмом
        const existingUser = await authServices.findUser({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email in use' });
        }

        // Генерация хэшированного пароля, аватара и токена верификации
        const hashPassword = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email);
        const verificationToken = nanoid();

        // Создание письма для верификации
        const mail = {
            to: email,
            subject: 'Verify your email',
            html: `<p>Thank you for signing up! Please confirm your email:</p>
                   <a target="_blank" href="${PROJECT_URL}/api/users/verify/${verificationToken}">Verify email</a>`,
        };

        // Попытка отправить электронное письмо
        await sendEmail(mail); // Если отправка завершилась неудачей, произойдёт исключение

        // Если письмо успешно отправлено, создаём пользователя
        const newUser = await authServices.signup({
            email,
            password: hashPassword,
            avatarURL,
            verificationToken,
        });

        // Ответ об успешном создании
        res.status(201).json({
            user: {
                email: newUser.email,
                avatarURL: newUser.avatarURL,
                verificationToken: newUser.verificationToken,
            },
        });
    } catch (error) {
        // Обработка ошибок
        next(error);
    }
};

// const signup = async (req, res) => {
//     const { email, password } = req.body;
//     const user = await authServices.findUser({ email });

//     if (user) {
//         throw HttpError(409, 'Email in use');
//     }

//     const hashPassword = await bcrypt.hash(password, 10);
//     const avatarURL = gravatar.url(email);
//     const verificationToken = nanoid();

//     const newUser = await authServices.signup({
//         ...req.body,
//         password: hashPassword,
//         avatarURL,
//         verificationToken,
//     });

//     const mail = {
//         to: email,
//         subject: 'Verify email',
//         html: `<p>Hello, thank you for using our service, please confirm your email </p>
//         <a target="_blank" href="${PROJECT_URL}/api/users/verify/${verificationToken}">Verify email</a>`,
//     };

//     await sendEmail(mail);

//     res.status(201).json({
//         user: newUser,
//     });
// };

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) {
        throw HttpError(401, 'Email or password is invalid');
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, 'Email or password is invalid');
    }

    const { _id: id } = user;

    const payload = {
        id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' });
    const response = await authServices.updateUser({ _id: id }, { token });

    res.json({
        token,
        user: response,
    });
};

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;

    res.json({
        email,
        subscription,
    });
};

const signout = async (req, res) => {
    const { _id } = req.user;

    await authServices.updateUser({ _id }, { token: '' });

    res.status(204).json();
};

const updateAvatar = async (req, res) => {
    if (!req.file) throw HttpError(400, 'The file was not found');

    const { _id } = req.user;


    const { path: tempUpload, originalname } = req.file;

    const image = await Jimp.read(tempUpload);
    if (!image) throw new Error('Failed to read image');

    await image.resize(250, 250).writeAsync(tempUpload);

    const uniquePrefix = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsPath, uniquePrefix);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('avatars', uniquePrefix);

    await authServices.updateUser({ _id }, { avatarURL });

    res.json({
        avatarURL,
    });
};

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
    updateAvatar: ctrlWrapper(updateAvatar),
};