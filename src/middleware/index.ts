
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

interface TokenPayload {
    userId: string;
    exp: number;
}


export const generateToken = async (userId: number, email: string) => {
    try{
        const payload = { userId };
        const secretKey = process.env.AUTHTOKEN_SECRET_KEY || 'your_secret_key'; 
        const options = { expiresIn: process.env.TOKEN_EXPIRE_TIME };
    
        const token = jwt.sign(payload, secretKey, options);
        return token;
    }catch(error){
        return null;
    }
    
};

export const verifyToken = async (req: Request, res: Response) => {
    const secretKey = process.env.AUTHTOKEN_SECRET_KEY || '';
    const jwtToken =  getToken(req.headers);
    if(jwtToken === null){
        res.status(401).json({message: "TOKEN-NOT-GIVEN"});
    }

    try{
        const decodedToken = jwt.verify(jwtToken, secretKey) as TokenPayload;
        const exp = decodedToken.exp;
        const epochTime = Math.floor(Date.now() / 1000);
        if (exp < epochTime) {
            res.status(401).json({message: "TOKEN-EXPIRED"});
        }else{
            return decodedToken;
        }
        
    }catch(error){
        return res.status(401).json({message: "NOT-AUTHORIZE"});;
    }
}

export const getToken = (headers) => {
    if (headers && headers.authorization) {
        const parted = headers.authorization.split(' ');

        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

export const jwtTokenVerification = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const epochTime = new Date().getTime() / 1000;
      const authHeader: string | undefined = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          status: 401,
          message: "Token Format is wrong",
        });
      }
  
      const idToken: string = authHeader.split(" ")[1];
      let decodedJwt: any = jwt.decode(idToken, { complete: true });
  
      if (decodedJwt.payload.exp < Math.floor(epochTime)) {
        return res.status(401).json({
          status: 401,
          message: "TOKEN-EXPIRED",
        });
      }
  
      if (decodedJwt) {
        const userId = decodedJwt.payload.userId;
  
        // Validate if user exists in the database
        const condition = { where: { id: userId } };
        const getResult = await User.findOne(condition);
  
        if (!getResult) {
          return res
            .status(400)
            .json({ status: 400, message: "USER-NOT-EXISTS" });
        }
  
        // Assign userId to req.body for later access in route handlers
        req.body.userId = getResult.id;
        console.log("req.body.userId ::", req.body.userId);
  
        next(); 
      } else {
        return res.status(400).json({
          status: 401,
          message: "INVALID-TOKEN",
        });
      }
    } catch (error) {
      next(error); 
    }
  };
