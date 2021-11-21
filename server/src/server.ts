import express from 'express';
import mongoose from 'mongoose';
import { authController, mediaController } from './controllers';

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3001;
const dbUri = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(dbUri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to DB');
});

app.use('/media', mediaController);
app.use('/auth', authController);

app.listen(port, () => {
  console.log(`Hooked on ${port}`);
});
