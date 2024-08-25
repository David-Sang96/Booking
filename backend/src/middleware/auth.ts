import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { ENV_VARS } from '../config/envVars';

// extend express request type
// extend the Express.Request interface globally to include a userId property.
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['auth_token'];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Unauthorized- no token provided' });
  }

  try {
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET as string);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: 'Unauthorized- invalid token' });
    }

    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    console.log('Error in verifyToken: ', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

export default verifyToken;
