<<<<<<< Updated upstream
// import contactsService from "../services/contactsServices.js";
import {
    listContacts,

} from "../services/contactsServices.js";



export const getAllContacts = async (req, res) => {
    const result = await listContacts();

    res.json(result);
};

export const getOneContact = (req, res) => { };

export const deleteContact = (req, res) => { };

export const createContact = (req, res) => { };

export const updateContact = (req, res) => { };

=======

// import * as contactsService from '../services/contactsServices.js';
import { listContacts, getContactById, removeContact, addContact } from '../services/contactsServices.js';
console.log(listContacts);
export const getAllContacts = async (req, res) => {
    const result = await listContacts();

    res.json(result);
};

export const getOneContact = (req, res) => { };

export const deleteContact = (req, res) => { };

export const createContact = (req, res) => { };

export const updateContact = (req, res) => { };
>>>>>>> Stashed changes
