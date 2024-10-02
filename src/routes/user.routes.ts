import express from "express";
import {getSingleUser, createUser, login, verifyJwtToken} from '../controllers/user.controller'

const user_router = express.Router();

user_router.get("/getUser", getSingleUser);

user_router.post("/createUser", createUser);

user_router.post("/login", login);

user_router.get("/verifyJwtToken", verifyJwtToken);

export default user_router;
