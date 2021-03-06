import express from 'express';
import mongoose from 'mongoose';
import { mediaController } from './controllers';

require('dotenv').config();

const app = express();
app.use(express.json());

const port = 3001;
const dbUri = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(dbUri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to DB');
});

app.use('/media', mediaController);

app.listen(port, () => {
  console.log(`Hooked on ${port}`);
});
