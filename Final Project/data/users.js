const mongoCollections = require("../config/mongoCollections");
const userRegistration = mongoCollections.userRegistration;
const uuidv4 = require('uuid/v4');
const bcrypt = require("bcrypt");
const saltRounds = 16;

let exportedMethods = {
    async findByUsername(username, callback)  {
        if(!username) {
            return callback(null, null);
        }
        return userRegistration().then((userRegistrationCollection) => {
            return userRegistrationCollection.findOne({ "userLogin.email": username }).then((user) => {
                    if (!user)
                        return callback(null, null);

                    return callback(null, user);
                });
            }, (error) => {
                // Something went wrong with the server!
                return callback(null, null);
            }
        );

        // return callback(null, null);
    },
    async getUserById(id, callback) {
        if(!id) {
            throw "Invalid data passed !!";
        }

        const userRegistrationCollection = await userRegistration();
        const user = await userRegistrationCollection.findOne({ "_id": id });
        return user;
    },
    async findById(id, callback) {
        if(!id) {
            return callback(new Error('No id passed'));
        }

        return userRegistration().then((userRegistrationCollection) => {
                return userRegistrationCollection.findOne({ "_id": id }).then((user) => {
                    if (!user)
                        return callback(new Error('User ' + id + ' does not exist'));

                    return callback(null, user);
                });
            }, (error) => {
                // Something went wrong with the server!
                callback(new Error('Error occurred looking user'))
            }
        );

        //
        // for (var i = 0, len = users.length; i < len; i++) {
        //     var user = users[i];
        //     if (user.id === id) {
        //         return callback(null, user);
        //     }
        // }
        // return callback(new Error('User ' + id + ' does not exist'));
    },
    async verifyPassword(user, password) {
        if(!user) {
            return false;
        }
        if(!password) {
            return false;
        }
        try {
            return (user.userLogin.password === password);
            // return bcrypt.compare(password, user.hashedPassword);
        } catch (e) {
            // no op
        }
    },
    async registerUser(userRegistrationData) {
        if(!userRegistrationData && !userRegistrationData.name
            && !userRegistrationData.email && userRegistrationData.password
            && !userRegistrationData.address) {
            throw "Invalid data passed !!";
        }

        // get mongo collection
        const userRegistrationCollection = await userRegistration();
        let newUser = {};
        newUser._id = uuidv4();
        newUser.name = userRegistrationData.name;
        if(userRegistrationData.dob) {
            newUser.dob = new Date(userRegistrationData.dob);
        }
        newUser.userLogin = {};
        newUser.userLogin._id = newUser._id;
        newUser.userLogin.email = userRegistrationData.email;
        newUser.userLogin.password = userRegistrationData.password;

        const insertInfo = await userRegistrationCollection.insertOne(newUser);
        if (insertInfo.insertedCount === 0) {
            throw "Could not register user !! Please try again later !!";
        }

        const newId = insertInfo.insertedId;
        const addedUsed = await this.getUserById(newId);
        return addedUsed;
    }
}

module.exports = exportedMethods;