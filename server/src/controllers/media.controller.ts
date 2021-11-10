import { Router, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/videos/:videoName', (_req: Request, _res: Response) => {
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

  const CHUNK_SIZE: number = 10 ** 6; // 1MB
  const _start: number = Number(_range.replace(/\D/g, ''));
  const _end: number = Math.min(_start + CHUNK_SIZE, _videoSize - 1);
  const _contentLength = _end - _start + 1;
  const _headers = {
    'Content-Range': `bytes ${_start}-${_end}/${_videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': _contentLength,
    'Content-Type': 'video/mp4',
  };
  _res.writeHead(HttpStatusCodes.PARTIAL_CONTENT, _headers);

  const _videoStream = fs.createReadStream(_videoPath, {
    start: _start,
    end: _end,
  });
  _videoStream.pipe(_res);
  console.log('video size:::: ', _videoSize);
});

export const mediaController = router;
