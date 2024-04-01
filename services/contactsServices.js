import fs from 'fs/promises';
import path from 'path';
import { Contact } from '../models/contacts.js';

function generateUniqueId(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

//GET
export const listContacts = async () => {
    return await Contact.find({});
};

//GET ID
export const getContactById = async contactId => {
    return Contact.findById(contactId);
};

//DEL
export const removeContact = async contactId => {
    return Contact.findByIdAndDelete(contactId);
};

//POST
export const addContact = async data => {
    return Contact.create(data);
};





export async function updateContactById(id, data) {
    try {
        // Получаем список контактов
        let contacts = await listContacts();

        // Находим индекс контакта с указанным id
        const index = contacts.findIndex(item => item.id === id);

        // Если контакт с указанным id не найден, возвращаем null
        if (index === -1) {
            return null;
        }

        // Обновляем контакт данными из объекта data
        contacts[index] = { ...contacts[index], ...data };

        // Перезаписываем файл с обновленным списком контактов
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

        // Возвращаем обновленный контакт
        return contacts[index];
    } catch (error) {
        // Если произошла ошибка, возвращаем null
        return null;
    }
}


