import express from 'express';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import HttpStatusCodes from 'http-status-codes';

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

app.get('/videos/:name', (req: Request, res: Response) => {
  console.log('hit video route:::: ', req.params.name);
  const _range = req.headers.range;
  if (!_range) {
    res.status(HttpStatusCodes.BAD_REQUEST).send('Requires range header');
    return;
  }
  const _videoName: string = req.params.name;
  const _videoPath: string = path.join(
    __dirname,
    `../assets/videos/${_videoName}.mp4`
  );
  const _videoSize = fs.statSync(_videoPath).size;
  console.log('size:::: ', _videoSize);
});

app.listen(port, () => {
  console.log(`Hooked on ${port}`);
});
