const express = require("express");
const userRoute = express.Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUSer
} = require('../controllers/userController');

userRoute.post("/login",loginUSer);
userRoute.post("/create", createUser);
userRoute.get("/", getAllUsers);
userRoute.get("/:id", getUserById);
userRoute.put("/:id", updateUser);
userRoute.delete("/:id", deleteUser);

module.exports = userRoute;
