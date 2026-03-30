import express from "express";
import User from "../models/user.js";
import {
    deleteUserData,
    editUserData,
    getUserData,
    showUserData,
    storeUserData
} from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter
    .route("/")
    .get(getUserData)
    .post(storeUserData);

userRouter
    .route("/:id")
    .get(showUserData)
    .put(editUserData)
    .delete(deleteUserData)

export {userRouter};