import express from "express";
import {createTodo, getSingleData, getTodolistByUser, removeTodo, updateMarkComplete} from '../controllers/todolist-controller'
import { jwtTokenVerification } from '../middleware'

const todo_router = express.Router();

todo_router.get("/getTodo", getSingleData);

todo_router.post("/createTodo", jwtTokenVerification, createTodo);

todo_router.post("/todoListByUser", jwtTokenVerification, getTodolistByUser);

todo_router.put("/updateMarkComplete", jwtTokenVerification, updateMarkComplete);

todo_router.delete("/removeTodo/:id", jwtTokenVerification, removeTodo)

export default todo_router;
