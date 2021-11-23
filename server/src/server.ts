import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import {
  authController,
  mediaController,
  productsController,
} from './controllers';

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((_req: Request, _res: Response, _next: NextFunction) => {
  _res.setHeader('Access-Control-Allow-Origin', '*');
  _res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  _res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Authorization'
  );
  _next();
});

const port = 3001;
const dbUri = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(dbUri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to DB');
});

app.use('/media', mediaController);
app.use('/auth', authController);
app.use('/products', productsController);

app.listen(port, () => {
  console.log(`Hooked on ${port}`);
});
