import fs from 'fs/promises';
import path from 'path';


function generateUniqueId(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const contactsPath = path.join("db", "contacts.json");
console.log(contactsPath);

// Повертає масив контактів.
export async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

// Повертає об'єкт контакту з таким id. Повертає 
//  null, якщо контакт з таким id не знайдений.
export async function getContactById(contactId) {
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
export async function removeContact(contactId) {
    try {
        let contacts = await listContacts();
        const removedContact = contacts.find(contact => contact.id === contactId);
        if (!removedContact) return null;

        contacts = contacts.filter(contact => contact.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

        return removedContact;
    } catch (error) {
        return null;
    }

}
// Повертає об'єкт доданого контакту (з id).
export async function addContact(name, email, phone) {
    try {
        let contacts = await listContacts();
        const newContact = {
            id: generateUniqueId(),
            name,
            email,
            phone
        };

        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

        return newContact;
    } catch (error) {
        return null;
    }
}

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


// export const updateContactById = async (id, data) => {
//     const contact = await listContacts();

//     const index = contact.findIndex(item => item.id === id);
//     if (index === -1) {
//         return null;
//     }

//     contact[index] = { ...contact[index], ...data };

//     await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));

//     return contact[index];
// };

