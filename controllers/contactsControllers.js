import {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContactById
} from "../services/contactsServices.js";

import { createContactSchema } from '../schemas/contactsSchemas.js'

import HttpError from '../helpers/HttpError.js'

export const getAllContacts = async (req, res, next) => {
    try {
        const result = await listContacts();
        res.json(result);

    } catch (error) {
        next(error)
    }

};


export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await removeContact(id);

        if (!result) {
            throw HttpError(404, `Not found`);
        }
        res.status(200).json(result);


    } catch (error) {
        next(error)
    }
};


export const createContact = async (req, res, next) => {
    try {
        // Валидация входных данных
        const { error } = createContactSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Извлечение данных о контакте из запроса
        const { name, email, phone } = req.body;

        // Добавление контакта
        const result = await addContact({ name, email, phone });

        // Проверка успешности операции добавления контакта
        if (!result) {
            // Если контакт не был добавлен, создание исключения
            throw HttpError(201, `Not found`);
        }

        // Отправка успешного ответа с добавленным контактом
        res.status(201).json(result);

    } catch (error) {
        // Передача ошибки обработчику ошибок
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await getContactById(id);

        if (!result) {
            throw HttpError(404, `Not found`);
        }
        res.json(result);

    } catch (error) {
        next(error)
    }
};



export const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;


        if (Object.keys(req.body).length === 0) {
            throw HttpError(400, `Body must have at least one field`);
        }
        const result = await updateContactById(id, req.body);

        if (!result) {
            throw HttpError(404, `Not found`);
        }

        res.json(result);
    } catch (error) {
        next(error)
    }
};


//--------------------------------------









