const mongoCollections = require("../config/mongoCollections");
const orders = mongoCollections.orders;

const tempOrdersData = [
    {
        _id: "1245325124124",
        userId: "9ef11a95-1f49-45ca-95e9-9d401be4cb78",
        userName: "Poonam",
        orderDate: "11/20/2017T17:30:05Z",
        orderNumber: "101",
        amount: 120,
        itemsOrder: [
            {
                userId: "9ef11a95-1f49-45ca-95e9-9d401be4cb78",
                itemName: "Veg Soup",
                quantity: 2,
                price: 20
            },
            {
                userId: "9ef11a95-1f49-45ca-95e9-9d401be4cb78",
                itemName: "Veg Meal",
                quantity: 4,
                price: 20
            }
        ]
    },
    {
        _id: "1245325124124",
        userId: "9ef11a95-1f49-45ca-95e9-9d401be4cb78",
        userName: "Poonam",
        orderDate: "11/20/2017T17:30:05Z",
        orderNumber: "101",
        amount: 120,
        itemsOrder: [
            {
                userId: "9ef11a95-1f49-45ca-95e9-9d401be4cb78",
                itemName: "Veg Soup",
                quantity: 2,
                price: 20
            },
            {
                userId: "9ef11a95-1f49-45ca-95e9-9d401be4cb78",
                itemName: "Veg Meal",
                quantity: 4,
                price: 20
            }
        ]
    },
    {
        _id: "1245325124124",
        userId: "9ef11a95-1f49-45ca-95e9-9d401be4cb78",
        userName: "Poonam",
        orderDate: "11/20/2017T17:30:05Z",
        orderNumber: "101",
        amount: 120,
        itemsOrder: [
            {
                userId: "9ef11a95-1f49-45ca-95e9-9d401be4cb78",
                itemName: "Veg Soup",
                quantity: 2,
                price: 20
            },
            {
                userId: "9ef11a95-1f49-45ca-95e9-9d401be4cb78",
                itemName: "Veg Meal",
                quantity: 4,
                price: 20
            }
        ]
    },
];


let exportedMethods = {
    async getOrdersByUserId(user)  {
        if(!user) {
            throw "Error occurred !! Invalid user !!";
        }
        const ordersCollection = await orders();
        const ordersOfUser = await ordersCollection.find({ "userId": user._id }).toArray();
        console.log(ordersOfUser);
        // return ordersOfUser;
        return tempOrdersData;
    }
};

module.exports = exportedMethods;