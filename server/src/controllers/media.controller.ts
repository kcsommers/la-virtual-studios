import { Router, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import fs from 'fs';
import path from 'path';
import { GoogleDriveService, IFileInfo } from '../third-party';
import stream from 'stream';

const router = Router();

router.get('/videos/:videoName', (_req: Request, _res: Response) => {
  // Listing 3.
  const _options: { [header: string]: any } = {};

  let _start: number;
  let _end: number;

  const _range: string = _req.headers.range;
  console.log('RANGE:::: ', _range);
  if (_range) {
    const bytesPrefix = 'bytes=';
    if (!_range.startsWith(bytesPrefix)) {
      return;
    }
    const bytesRange = _range.substring(bytesPrefix.length);
    console.log('BYTESRANGE:::: ', bytesRange);
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

  console.log('Start:::: ', _start);
  console.log('End:::: ', _end);
  console.log('Diff:::: ', _start - _end);

  _res.setHeader('content-type', 'video/mp4');
  const _videoName: string = _req.params.videoName;
  const _filePath: string = path.join(
    __dirname,
    `../public/videos/${_videoName}.mp4`
  );

  GoogleDriveService.getFileInfo(
    _videoName,
    (_error: Error, _fileInfo: IFileInfo) => {
      if (_error) {
        _res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
        return;
      }

      if (_req.method === 'HEAD') {
        _res.statusCode = HttpStatusCodes.OK;
        _res.setHeader('accept-ranges', 'bytes');
        _res.setHeader('content-length', _fileInfo.size);
        _res.end();
        return;
      }
      let _retrievedLength: number;
      if (_start !== undefined && _end !== undefined) {
        _retrievedLength = _end + 1 - _start;
      } else if (_start !== undefined) {
        _retrievedLength = _fileInfo.size - _start;
      } else if (_end !== undefined) {
        _retrievedLength = _end + 1;
      } else {
        _retrievedLength = _fileInfo.size;
      }
      _res.statusCode =
        _start !== undefined || _end !== undefined
          ? HttpStatusCodes.PARTIAL_CONTENT
          : HttpStatusCodes.OK;

      _res.setHeader('content-length', _retrievedLength);

      if (_range !== undefined) {
        _res.setHeader(
          'content-range',
          `bytes ${_start || 0}-${_end || _fileInfo.size - 1}/${_fileInfo.size}`
        );
        _res.setHeader('accept-ranges', 'bytes');
      }

      GoogleDriveService.stream(_fileInfo.id, (_error: Error, _chunk: any) => {
        console.log('download file chunk:::: ', _chunk, typeof _chunk);
        const fileStream = fs.createReadStream(
          _chunk.readableState.buffer,
          _options
        );
        fileStream.on('error', (error) => {
          console.log(`Error reading file ${_filePath}.`);
          console.log(error);
          _res.sendStatus(500);
        });

        fileStream.pipe(_res);
      });
    }
  );

  // fs.stat(_filePath, (err: NodeJS.ErrnoException, stat: fs.Stats) => {
  //   if (err) {
  //     console.error(`File stat error for ${_filePath}.`);
  //     console.error(err);
  //     _res.sendStatus(500);
  //     return;
  //   }

  //   let _contentLength = stat.size;
  //   console.log('ContentLenght:::: ', _contentLength);

  //   // Listing 4.
  //   if (_req.method === 'HEAD') {
  //     _res.statusCode = 200;
  //     _res.setHeader('accept-ranges', 'bytes');
  //     _res.setHeader('content-length', _contentLength);
  //     _res.end();
  //   } else {
  //     // Listing 5.
  //     let _retrievedLength: number;
  //     if (_start !== undefined && _end !== undefined) {
  //       _retrievedLength = _end + 1 - _start;
  //     } else if (_start !== undefined) {
  //       _retrievedLength = _contentLength - _start;
  //     } else if (_end !== undefined) {
  //       _retrievedLength = _end + 1;
  //     } else {
  //       _retrievedLength = _contentLength;
  //     }
  //     console.log('retrievedLength:::: ', _retrievedLength);

  //     console.log('======================================================');
  //     // Listing 6.
  //     _res.statusCode = _start !== undefined || _end !== undefined ? 206 : 200;

  //     _res.setHeader('content-length', _retrievedLength);

  //     if (_range !== undefined) {
  //       _res.setHeader(
  //         'content-range',
  //         `bytes ${_start || 0}-${_end || _contentLength - 1}/${_contentLength}`
  //       );
  //       _res.setHeader('accept-ranges', 'bytes');
  //     }

  //     // Listing 7.
  //     const fileStream = fs.createReadStream(_filePath, _options);
  //     fileStream.on('error', (error) => {
  //       console.log(`Error reading file ${_filePath}.`);
  //       console.log(error);
  //       _res.sendStatus(500);
  //     });

  //     fileStream.pipe(_res);
  //   }
  // });
});

export const mediaController = router;
