const mongoCollections = require("../config/mongoCollections");
const contactUs = mongoCollections.contactUs;
const uuidv4 = require('uuid/v4');

let exportedMethods = {

    async getMessageById(id) {
        if(!id) {
            throw "Invalid data passed !!";
        }

        const userContactCollection = await contactUs();
        const message = await userContactCollection.findOne({ "_id": id });
        return message;
    },

    async userContacting(userContactData) {
        if(!userContactData && !userContactData.name
            && !userContactData.email
            && !userContactData.message) {
            throw "Invalid data passed !!";
        }

        // get mongo collection
        const userContactCollection = await contactUs();
        let newMessage = {};
        newMessage._id = uuidv4();
        newMessage.name = userContactData.name;
        newMessage.email = userContactData.email;
        newMessage.message = userContactData.message;

        const insertInfo = await userContactCollection.insertOne(newMessage);
        if (insertInfo.insertedCount === 0) {
            throw "Could not submit your message !! Please try again later !!";
        }

        const newId = insertInfo.insertedId;
        const addedMessage = await this.getMessageById(newId);
        return addedMessage;
    }


}

module.exports = exportedMethods;