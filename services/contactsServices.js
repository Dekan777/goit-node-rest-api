// import { Contact } from '../models/contacts.js';

// //GET
// export const listContacts = async (filter = {}) => {
//     return Contact.find(filter).populate('owner', 'email subscription');
// };

// //GET BY ID
// export const getContactById = async ({ _id: contactId, owner }) => {
//     return Contact.findOne({ _id: contactId, owner });
// };

// //DELETE
// export const deleteContactById = async ({ _id: contactId, owner }) => {
//     return Contact.findOneAndDelete({ _id: contactId, owner });
// };

// //CREATE
// export const createContact = async ({ _id: owner, ...data }) => {
//     return Contact.create({ ...data, owner });
// };

// //UPDATE BY ID
// export const updateContactById = async ({ _id: contactId, owner }, newData) => {
//     return Contact.findOneAndUpdate({ _id: contactId, owner }, newData, {
//         new: true,
//     });
// };

// //UPDATE FAVORITE STATUS
// export const updateFavoriteStatusById = async ({ _id: contactId, owner }, newFavoriteStatus) => {
//     const status = { favorite: newFavoriteStatus };
//     return Contact.findOneAndUpdate({ _id: contactId, owner }, status, {
//         new: true,
//     });
// };


import { Contact } from '../models/contacts.js';

//GET
export const listContacts = async (filter = {}) => {
    return Contact.find(filter).populate('owner', 'email subscription');
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

//PATCH
export const updateFavoriteStatus = async (contactId, data) => {
    const status = { favorite: data };
    return Contact.findByIdAndUpdate(contactId, status, {
        new: true,
    });
};