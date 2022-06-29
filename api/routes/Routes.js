module.exports = (app) => {
    const userController = require("../controllers/userController");

    //TODO-01 USER API ROUTES
    app
        .route("/api/v1/users")
        .get(userController.GetAllUser)
        .post(userController.CreateUser);

    app
        .route("/api/v1/users/:id")
        .get(userController.GetUserByID)
        .put(userController.UpdateUser)
        .delete(userController.DeleteUser);
};