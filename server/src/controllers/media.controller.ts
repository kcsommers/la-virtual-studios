import { Router, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/videos/:videoName', (_req: Request, _res: Response) => {
  console.log('headers:::: ', _req.headers);
  console.log('dir:::: ', __dirname);
  const _range = _req.headers.range;
  if (!_range) {
    _res.status(HttpStatusCodes.BAD_REQUEST).send('Requires range header');
    return;
  }
  const _videoName: string = _req.params.videoName;
  const _videoPath: string = path.join(
    __dirname,
    `../public/videos/${_videoName}.mp4`
  );
  const _videoSize = fs.statSync(_videoPath).size;
  console.log('video size:::: ', _videoSize);
});

export const mediaController = router;
