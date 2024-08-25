import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';

import { connectDB } from './config/db';
import { ENV_VARS } from './config/envVars';
import verifyToken from './middleware/auth';
import authRoutes from './routes/auth.router';
import myHotelsRoutes from './routes/my-hotels.router';
import userRoutes from './routes/user.router';

const app: Express = express();

const PORT = ENV_VARS.PORT || 3100;

if (ENV_VARS.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const allowedOrigins =
  ENV_VARS.NODE_ENV === 'production'
    ? ['https://booking-app-glea.onrender.com']
    : [ENV_VARS.FRONTEND_URL as string];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(verifyToken);
app.use('/api/v1/my-hotels', myHotelsRoutes);

if (ENV_VARS.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });
}

app.listen(PORT, async () => {
  await connectDB();
  console.log(`server running on port : ${PORT}`);
});
