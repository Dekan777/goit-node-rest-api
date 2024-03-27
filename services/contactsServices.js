<<<<<<< Updated upstream
import fs from 'fs/promises';
import path from 'path';

=======
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
>>>>>>> Stashed changes

function generateUniqueId(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

<<<<<<< Updated upstream
const contactsPath = path.join("db", "contacts.json");
console.log(contactsPath);

// Повертає масив контактів.
export async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};
=======
const contactsPath = path.join('db', 'contacts.json');

// Повертає масив контактів.
async function listContacts() {
    try {
        const data = await readFile(contactsPath);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}
>>>>>>> Stashed changes

// Повертає об'єкт контакту з таким id. Повертає 
//  null, якщо контакт з таким id не знайдений.
async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        return contacts.find(contact => contact.id === contactId) || null;
    } catch (error) {
        return null;
    }
}

// Повертає об'єкт видаленого 
//  контакту. Повертає null, якщо контакт 
//  з таким id не знайдений.
async function removeContact(contactId) {
    try {
        let contacts = await listContacts();
        const removedContact = contacts.find(contact => contact.id === contactId);
        if (!removedContact) return null;

        contacts = contacts.filter(contact => contact.id !== contactId);
        await writeFile(contactsPath, JSON.stringify(contacts, null, 2));

        return removedContact;
    } catch (error) {
        return null;
    }
}

// Повертає об'єкт доданого контакту (з id).
async function addContact(name, email, phone) {
    try {
        let contacts = await listContacts();
        const newContact = {
            id: generateUniqueId(),
            name,
            email,
            phone
        };

        contacts.push(newContact);
        await writeFile(contactsPath, JSON.stringify(contacts, null, 2));

        return newContact;
    } catch (error) {
        return null;
    }
}

<<<<<<< Updated upstream

=======
export { listContacts, getContactById, removeContact, addContact };
>>>>>>> Stashed changes
