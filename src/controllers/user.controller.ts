import User from "../models/user.model";
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import {generateToken, verifyToken} from '../middleware'

const getSingleUser = async (req: Request, res: Response) => {
    console.log("Log Checking");
    const users = await User.findAll();
    return res.send({data: users});
}

const createUser = async (req: Request, res: Response) => {
   try{
        let attributes = req.body.attributes;
        console.log("attributes ::", attributes);
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(attributes.password, salt);
        
        let condition = {
            where: {
                email: attributes.email
            }
        }

        const countOfData = await User.count(condition);

        let data = {
            name: attributes.name,
            email: attributes.email,
            password: hash
        }

        if(countOfData > 0){
            res.status(400).json({message: "Data already exists."});
        }else{
            const savedResult = await User.create(data);
            res.status(201).json({data: savedResult});
        }
   }catch(error){
        res.status(200).json({data: error});
   }
}

const login = async(req: Request, res: Response) => {
    try{
        let attributes = req.body.attributes;
        const condition = {
            where: {
                email: attributes.email
            }
        }

        const getResult = await User.findOne(condition);
        const isMatch = await bcrypt.compare(attributes.password, getResult!.password);
        if(!isMatch){
           
            return res.status(400).send({message: "Invalid Credentials"})
        }else{
            const Token = await generateToken(getResult!.id, getResult!.email);

            // Update data to be set
            let updateData = {
                auth_token: Token
            };

            // Update condition
            const updateCondition = {
                where: {
                    email: getResult?.email
                }
            };

            // Perform the update
            const updateUser = await User.update(updateData, updateCondition);
            if (updateUser[0] === 1) {
                const condition = {
                    where: {
                        email: attributes.email
                    }
                }
        
                const getResult = await User.findOne(condition);
                return res.status(200).send({data: getResult, message: 'Success'});
            }else{
                return res.status(400).send({data: getResult, message: 'Something went wrong !'});
            }

            
        }
        
    }catch(error){
        return res.status(400).send({message: "Unknown Error", data: error});
    }
}

export const verifyJwtToken = async (req: Request, res: Response) => {
    const verifyTokenJwt = verifyToken(req, res);
    console.log("verifyTokenJwt ::", verifyTokenJwt);
}


export {getSingleUser, createUser, login};