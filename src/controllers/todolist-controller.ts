import TodoList from "../models/todolist-model";
import { Request, Response } from 'express';

type OrderCondition = [string, 'ASC' | 'DESC'];

const getSingleData = async (req: Request, res: Response) => {
    try{
        const getData = await TodoList.findOne({});
        res.status(200).json({data: getData});
    }catch(error){
        res.status(400).json({data: error});
    }
}

const createTodo = async (req: Request, res: Response) => {
    try {
      let attributes = req.body.attributes;
      let userId = req.body.userId; // This should be set by jwtTokenVerification middleware
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is missing." });
      }
  
  
      let data = {
        name: attributes.name, 
        status: 1,             
        userId: userId         // Use userId from req.body set by middleware
      };
  
      const savedResult = await TodoList.create(data);
      return res.status(201).json({ data: savedResult });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  export const getTodolistByUser = async (req: Request, res: Response) => {
    try{
        let userId = req.body.userId; // This should be set by jwtTokenVerification middleware
        console.log("userId ::", userId);
        let orderBy: OrderCondition[] = [
          [
            "id", "DESC"
          ]
        ]
        const condition = {
          where: {
              userId: userId // Filter by userId
          },
          order: orderBy
      };
      
      // Fetch the results from the TodoList model
      const getResult = await TodoList.findAll(condition);
        res.status(200).json({data: getResult});
    }catch(error){
        return res.status(400).json({ error: error.message });
    }
  }

const updateMarkComplete = async (req: Request, res: Response) => {
    try{
        let attributes = req.body.attributes;
        let condition = {
            where: {
                id: attributes.id
            }
        }

        let data = {
            status: 0
        }

        const updateTodo = await TodoList.update(data, condition);

        if(updateTodo[0] === 1){
          res.status(200).json({message: "UPDATE SUCCESS", data: updateTodo});
        }else{
          res.status(400).json({message: "UPDATE FAILED", data: updateTodo});
        }

        
    }catch(error){
        res.status(400).json({message: "UNKNOWN-ERROR-RETRY", data: error.message});
    }
}

const removeTodo = async (req: Request, res: Response) => {
  try{
    let attributes = req.params;
    let condition = {
        where: {
            id: attributes.id
        }
    }

    const removeTodo = await TodoList.destroy(condition);
    if(removeTodo){
      res.status(200).json({message: "DELETE SUCCESSFULLY", data:removeTodo });
    }else{
      res.status(400).json({message: "DELETE FAILED", data:removeTodo });
    }
    
  }catch(error){
    res.status(400).json({message: "UNKNOWN-ERROR-RETRY", data: error.message});
  }
}

export {getSingleData, createTodo, updateMarkComplete, removeTodo}