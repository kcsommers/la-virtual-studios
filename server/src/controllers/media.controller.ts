import { Router, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/videos/:videoName', (_req: Request, _res: Response) => {
  // Listing 3.
  const _options: { [header: string]: any } = {};

  let _start: number;
  let _end: number;

  const _range: string = _req.headers.range;
  if (_range) {
    const bytesPrefix = 'bytes=';
    if (_range.startsWith(bytesPrefix)) {
      const bytesRange = _range.substring(bytesPrefix.length);
      const parts = bytesRange.split('-');
      if (parts.length === 2) {
        const rangeStart = parts[0] && parts[0].trim();
        if (rangeStart && rangeStart.length > 0) {
          _options.start = _start = parseInt(rangeStart);
        }
        const rangeEnd = parts[1] && parts[1].trim();
        if (rangeEnd && rangeEnd.length > 0) {
          _options.end = _end = parseInt(rangeEnd);
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

  fs.stat(_filePath, (err: NodeJS.ErrnoException, stat: fs.Stats) => {
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
      if (_start !== undefined && _end !== undefined) {
        retrievedLength = _end + 1 - _start;
      } else if (_start !== undefined) {
        retrievedLength = contentLength - _start;
      } else if (_end !== undefined) {
        retrievedLength = _end + 1;
      } else {
        retrievedLength = contentLength;
      }

      // Listing 6.
      _res.statusCode = _start !== undefined || _end !== undefined ? 206 : 200;

      _res.setHeader('content-length', retrievedLength);

      if (_range !== undefined) {
        _res.setHeader(
          'content-range',
          `bytes ${_start || 0}-${_end || contentLength - 1}/${contentLength}`
        );
        _res.setHeader('accept-ranges', 'bytes');
      }

      // Listing 7.
      const fileStream = fs.createReadStream(_filePath, _options);
      fileStream.on('error', (error) => {
        console.log(`Error reading file ${_filePath}.`);
        console.log(error);
        _res.sendStatus(500);
      });

      fileStream.pipe(_res);
    }
  });
});

export const mediaController = router;
