import { Request, Response, Router } from 'express';
import fs from 'fs';
import HttpStatusCodes from 'http-status-codes';
import path from 'path';
import stream from 'stream';
import { GoogleDriveService, IFileInfo } from '../third-party';

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

  // GoogleDriveService.getFileInfo(
  //   _videoName,
  //   (_err: Error, _fileInfo: IFileInfo) => {
  //     if (_err) {
  //       return _res.sendStatus(500);
  //     }
  // });

  fs.stat(_filePath, (err, stat) => {
    if (err) {
      console.error(`File stat error for ${_filePath}.`);
      console.error(err);
      _res.sendStatus(500);
      return;
    }

    let contentLength = stat.size;

    if (_req.method === 'HEAD') {
      _res.statusCode = 200;
      _res.setHeader('accept-ranges', 'bytes');
      _res.setHeader('content-length', contentLength);
      _res.end();
    } else {
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

      _res.statusCode = start !== undefined || end !== undefined ? 206 : 200;

      _res.setHeader('content-length', retrievedLength);

      if (range !== undefined) {
        _res.setHeader(
          'content-range',
          `bytes ${start || 0}-${end || contentLength - 1}/${contentLength}`
        );
        _res.setHeader('accept-ranges', 'bytes');
      }

      // GoogleDriveService.getReadableStream(
      //   _fileInfo.id,
      //   (_err: Error, _fileStream: stream.PassThrough) => {
      //     _fileStream.on('error', (error) => {
      //       console.log(`Error reading file ${_videoName}.`);
      //       console.log(error);
      //       _res.sendStatus(500);
      //     });

      //     _fileStream.on('data', (_data) => {
      //       // console.log('::::more data::::');
      //     });

      //     _fileStream.on('end', (_data) => {
      //       console.log('::::STREAM ENDED::::');
      //       _fileStream.unpipe();
      //     });

      //     _fileStream.on('close', (_data) => {
      //       console.log('::::STREAM CLOSED::::');
      //       _fileStream.unpipe();
      //     });

      //     _fileStream.on('unpipe', (_data) => {
      //       console.log('::::STREAM UNPIPED::::');
      //     });

      //     _fileStream.pipe(_res);
      //   }
      // );
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

export const mediaController = router;
