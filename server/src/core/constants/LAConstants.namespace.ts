import path from 'path';

export namespace LAConstants {
  export const CREDENTIALS_DIRECTORY: string = path.join(
    __dirname,
    './credentials'
  );

  export const MAX_CHUNK_SIZE: number = 2;
}
