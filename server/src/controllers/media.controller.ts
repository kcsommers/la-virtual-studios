import { Router, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/videos/:videoName', (_req: Request, _res: Response) => {
  // Listing 3.
  const options: { [header: string]: any } = {};

  let start;
  let end;

  const range = _req.headers.range;
  if (range) {
    const bytesPrefix = 'bytes=';
    if (range.startsWith(bytesPrefix)) {
      const bytesRange = range.substring(bytesPrefix.length);
      const parts = bytesRange.split('-');
      if (parts.length === 2) {
        const rangeStart = parts[0] && parts[0].trim();
        if (rangeStart && rangeStart.length > 0) {
          options.start = start = parseInt(rangeStart);
        }
        const rangeEnd = parts[1] && parts[1].trim();
        if (rangeEnd && rangeEnd.length > 0) {
          options.end = end = parseInt(rangeEnd);
        }
      }
    }
  }

  _res.setHeader('content-type', 'video/mp4');
  const _videoName: string = _req.params.videoName;
  const _filePath: string = path.join(
    __dirname,
    `../public/videos/${_videoName}.mp4`
  );

  fs.stat(_filePath, (err, stat) => {
    if (err) {
      console.error(`File stat error for ${_filePath}.`);
      console.error(err);
      _res.sendStatus(500);
      return;
    }

    let contentLength = stat.size;

    // Listing 4.
    if (_req.method === 'HEAD') {
      _res.statusCode = 200;
      _res.setHeader('accept-ranges', 'bytes');
      _res.setHeader('content-length', contentLength);
      _res.end();
    } else {
      // Listing 5.
      let retrievedLength;
      if (start !== undefined && end !== undefined) {
        retrievedLength = end + 1 - start;
      } else if (start !== undefined) {
        retrievedLength = contentLength - start;
      } else if (end !== undefined) {
        retrievedLength = end + 1;
      } else {
        retrievedLength = contentLength;
      }

      // Listing 6.
      _res.statusCode = start !== undefined || end !== undefined ? 206 : 200;

      _res.setHeader('content-length', retrievedLength);

      if (range !== undefined) {
        _res.setHeader(
          'content-range',
          `bytes ${start || 0}-${end || contentLength - 1}/${contentLength}`
        );
        _res.setHeader('accept-ranges', 'bytes');
      }

      // Listing 7.
      const fileStream = fs.createReadStream(_filePath, options);
      fileStream.on('error', (error) => {
        console.log(`Error reading file ${_filePath}.`);
        console.log(error);
        _res.sendStatus(500);
      });

      fileStream.pipe(_res);
    }
  });
});

// router.get('/videos/:videoName', (_req: Request, _res: Response) => {
//   const _range = _req.headers.range;
//   if (!_range) {
//     _res.status(HttpStatusCodes.BAD_REQUEST).send('Requires range header');
//     return;
//   }

//   const _videoName: string = _req.params.videoName;
//   const _videoPath: string = path.join(
//     __dirname,
//     `../public/videos/${_videoName}.mp4`
//   );
//   const _videoSize = fs.statSync(_videoPath).size;

//   const CHUNK_SIZE: number = 10 ** 6; // 1MB
//   const _start: number = Number(_range.replace(/\D/g, ''));
//   const _end: number = Math.min(_start + CHUNK_SIZE, _videoSize - 1);
//   const _contentLength = _end - _start + 1;
//   const _headers = {
//     'Content-Range': `bytes ${_start}-${_end}/${_videoSize}`,
//     'Accept-Ranges': 'bytes',
//     'Content-Length': _contentLength,
//     'Content-Type': 'video/mp4',
//   };
//   _res.writeHead(HttpStatusCodes.PARTIAL_CONTENT, _headers);

//   const _videoStream = fs.createReadStream(_videoPath, {
//     start: _start,
//     end: _end,
//   });
//   _videoStream.pipe(_res);
//   console.log('video size:::: ', _videoSize);
// });

export const mediaController = router;
