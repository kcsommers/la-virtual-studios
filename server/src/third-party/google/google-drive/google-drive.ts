import { google } from 'googleapis';
import path from 'path';

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';

const jwtClient = new google.auth.JWT({
  keyFile: path.join(
    __dirname,
    '../../../certs/google-drive-service-account.json'
  ),
  scopes: SCOPES,
});

console.log('JWT CLIENT:::: ', jwtClient);

jwtClient.authorize((_error: Error, _token) => {
  if (_error) {
    console.error('ERR::::: ', _error);
  } else {
    console.log('TOKKENNNN:::: ', _token);
  }
});

const drive = google.drive('v3');

// drive.files.get;

drive.files.list(
  {
    auth: jwtClient,
    q: "name contains 'greg_james_studio_tour'",
  },
  (_error: Error, _response: any) => {
    if (_error) {
      console.error('ERR::::: ', _error);
    } else {
      const _files: any[] = _response.data.files || [];
      if (!_files.length) {
        return;
      }
      const _video = _files[0];
      const _id: string = _video.id;
    }
  }
);
