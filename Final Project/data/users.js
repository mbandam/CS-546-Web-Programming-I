const mongoCollections = require("../config/mongoCollections");
const userRegistration = mongoCollections.userRegistration;
const bcrypt = require("bcrypt");
const saltRounds = 16;

const users = [
    {
        id: "1245325124124",
        name: "Poonam Bhilare",
        dob: "",
        address: "25 River Dr South, Jersey City, NJ, 07302",
        userLogin: {
            email: "abc@gmail.com",
            password: "abc123",
            id: "1245325124124"
        }
    },
    {
        id: "1245325124125",
        name: "Poonam Bhilare",
        dob: "",
        address: "25 River Dr South, Jersey City, NJ, 07302",
        userLogin: {
            email: "xyz@gmail.com",
            password: "xyz123",
            id: "1245325124125"
        }
    },
    {
        id: "1245325124127",
        name: "Poonam Bhilare",
        dob: "",
        address: "25 River Dr South, Jersey City, NJ, 07302",
        userLogin: {
            email: "pqr@gmail.com",
            password: "pqr123",
            id: "1245325124127"
        }
    }
]

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
    async findById(id, callback) {
        if(!id) {
            return callback(new Error('No id passed'));
        }

        return userRegistration().then((userRegistrationCollection) => {
                return userRegistrationCollection.findOne({ "id": id }).then((user) => {
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
    }
}

module.exports = exportedMethods;