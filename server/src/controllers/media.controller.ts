import { Request, Response, Router } from 'express';
import fs from 'fs';
import HttpStatusCodes from 'http-status-codes';
import path from 'path';
import { GoogleDriveService, IFileInfo } from '../third-party';

const router = Router();

router.get('/videos/:videoName', (_req: Request, _res: Response) => {
  const _videoName: string = _req.params.videoName;
  GoogleDriveService.getFileInfo(
    _videoName,
    (_error: Error, _fileInfo: IFileInfo) => {
      if (_error) {
        _res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
        return;
      }
      const _range: string = _req.headers.range;
      console.log('range:::: ', _range);
      if (_range) {
        const rangeStringParts = _range.replace(/bytes=/, '').split('-');
        const bytesStart = parseInt(rangeStringParts[0]);
        const bytesEnd = rangeStringParts[1]
          ? parseInt(rangeStringParts[1])
          : _fileInfo.size - 1;

        const CHUNK_SIZE = bytesEnd - bytesStart + 1; // 1MB
        GoogleDriveService.getReadableStream(
          _fileInfo.id,
          (_error: Error, _videoStream: fs.ReadStream) => {
            const _headers = {
              'Content-Range': `bytes ${bytesStart}-${bytesEnd}/${_fileInfo.size}`,
              'Accept-Ranges': 'bytes',
              'Content-Length': CHUNK_SIZE,
              'Content-Type': 'video/mp4',
            };
            _res.writeHead(HttpStatusCodes.PARTIAL_CONTENT, _headers);
            _videoStream.pipe(_res);
          }
        );
        return;
      }

      GoogleDriveService.getReadableStream(
        _fileInfo.id,
        (_error: Error, _videoStream: fs.ReadStream) => {
          const _headers = {
            'Content-Length': _fileInfo.size,
            'Content-Type': 'video/mp4',
          };
          _res.writeHead(HttpStatusCodes.PARTIAL_CONTENT, _headers);
          _videoStream.pipe(_res);
        }
      );
    }
  );

  // router.get('/videos/:videoName', (_req: Request, _res: Response) => {
  //   const _videoName: string = _req.params.videoName;
  //   const _range: string = _req.headers.range;
  //   const BYTES_PREFIX = 'bytes=';
  //   if (!_range.startsWith(BYTES_PREFIX)) {
  //     return;
  //   }
  //   GoogleDriveService.getFileInfo(
  //     _videoName,
  //     (_error: Error, _fileInfo: IFileInfo) => {
  //       if (_error) {
  //         _res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
  //         return;
  //       }
  //       console.log('REQ METHOD:::: ', _req.method, _range);

  //       let _start: number;
  //       let _end: number;
  //       const _bytesRange: number[] = _range
  //         .substring(BYTES_PREFIX.length)
  //         .split('-')
  //         .map((_b) => +_b.trim());
  //       if (_bytesRange.length === 2) {
  //         _start = _bytesRange[0];
  //         _end = _bytesRange[1];
  //       }

  //       console.log('start:::: ', _start);
  //       console.log('end:::: ', _end);

  //       _res.setHeader('content-type', 'video/mp4');
  //       if (_req.method === 'HEAD') {
  //         _res.statusCode = HttpStatusCodes.OK;
  //         _res.setHeader('accept-ranges', 'bytes');
  //         _res.setHeader('content-length', _fileInfo.size);
  //         _res.end();
  //         return;
  //       }
  //       let _retrievedLength: number;
  //       if (_start !== undefined && _end !== undefined) {
  //         _retrievedLength = _end + 1 - _start;
  //       } else if (_start !== undefined) {
  //         _retrievedLength = _fileInfo.size - _start;
  //       } else if (_end !== undefined) {
  //         _retrievedLength = _end + 1;
  //       } else {
  //         _retrievedLength = _fileInfo.size;
  //       }
  //       _res.statusCode =
  //         _start !== undefined || _end !== undefined
  //           ? HttpStatusCodes.PARTIAL_CONTENT
  //           : HttpStatusCodes.OK;

  //       _res.setHeader('content-length', _retrievedLength);

  //       console.log(
  //         'hmmmmmmmmm::::: ',
  //         `bytes ${_start || 0}-${_end || _fileInfo.size - 1}/${_fileInfo.size}`
  //       );

  //       _res.setHeader(
  //         'content-range',
  //         `bytes ${_start || 0}-${_end || _fileInfo.size - 1}/${_fileInfo.size}`
  //       );
  //       _res.setHeader('accept-ranges', 'bytes');

  //       GoogleDriveService.getReadableStream(
  //         _fileInfo.id,
  //         (_error: Error, _fileStream: fs.ReadStream) => {
  //           _fileStream.on('error', (error) => {
  //             console.log(`Error reading file ${_videoName}.`);
  //             console.log(error);
  //             _res.sendStatus(500);
  //           });

  //           _fileStream.on('data', (_chunk) => {
  //             console.log('chunk:::: ', _chunk);
  //           });

  //           _fileStream.pipe(_res);
  //         }
  //       );
  //     }
  //   );

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
