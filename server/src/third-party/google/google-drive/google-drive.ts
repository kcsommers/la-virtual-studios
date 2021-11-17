import { google } from 'googleapis';
import { drive } from 'googleapis/build/src/apis/drive';
import path from 'path';

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';

const _jwtClient = new google.auth.JWT({
  keyFile: path.join(
    __dirname,
    '../../../certs/google-drive-service-account.json'
  ),
  scopes: SCOPES,
});

console.log('JWT CLIENT:::: ', _jwtClient);

_jwtClient.authorize((_error: Error, _token) => {
  if (_error) {
    console.error('ERR::::: ', _error);
  } else {
    console.log('TOKKENNNN:::: ', _token);
  }
});

const _drive = google.drive('v3');
_drive.files.list(
  {
    auth: _jwtClient,
  },
  (_error: Error, _response: any) => {
    if (_error) {
      console.error('ERR::::: ', _error);
    } else {
      const _files: any[] = _response.data.files || [];
      if (_files.length) {
        _files.forEach((_f) => {
          console.log('FILENAME:::: ', _f.name);
          console.log('FILE:::: ', _f);
        });
      }
    }
  }
);
