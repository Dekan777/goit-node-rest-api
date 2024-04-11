import { Schema, model } from 'mongoose';
import { emailRegepxp } from '../constants/user-constants.js';
import Joi from 'joi';


const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            match: emailRegepxp,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ['starter', 'pro', 'business'],
            default: 'starter',
        },
        token: {
            type: String,
            default: null,
        },
    },
    { versionKey: false }
);

const User = model('user', userSchema);


export default User;