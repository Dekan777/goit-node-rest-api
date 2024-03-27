import {
    listContacts,
    getContactById,

} from "../services/contactsServices.js";


export const getAllContacts = async (req, res) => {
    try {
        const result = await listContacts();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }

};


export const getOneContact = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getContactById(id);

        if (!result) {
            throw HttpError(404, `Not found`);
        }
        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        })
    }
};

export const deleteContact = (req, res) => { };

export const createContact = (req, res) => { };

export const updateContact = (req, res) => { };

