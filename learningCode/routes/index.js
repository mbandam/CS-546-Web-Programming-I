const applicationRoutes = require("./application-routes");

const constructorMethod = (app) => {
    app.use("/", applicationRoutes);
};

module.exports = constructorMethod;