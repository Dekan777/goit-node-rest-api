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

//PUT ID
export const updateContactById = async (contactId, data) => {
    return Contact.findByIdAndUpdate(contactId, data, {
        new: true,
    });
};

