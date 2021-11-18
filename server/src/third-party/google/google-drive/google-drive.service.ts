import { google } from 'googleapis';
import path from 'path';
import { Callback } from '@la/core';
import { JWT, Credentials } from 'google-auth-library';

class GoogleDriveServiceClass {
  private SCOPES: string[] = ['https://www.googleapis.com/auth/drive'];
  private TOKEN_PATH: string = 'token.json';
  private SERVICE_ACCOUNT_KEY_PATH: string = path.join(
    __dirname,
    './certs/google-drive-service-account.json'
  );
  private MAX_CHUNK_SIZE: number = 20000000;

  private _authorizedClient: JWT;

  private _credentials: Credentials;

  public setAuthorizedClient(): Promise<boolean> {
    console.log('this', __dirname, this.SERVICE_ACCOUNT_KEY_PATH);
    const _jwtClient = new google.auth.JWT({
      keyFile: this.SERVICE_ACCOUNT_KEY_PATH,
      scopes: this.SCOPES,
    });
    return new Promise((_resolve, _reject) => {
      _jwtClient.authorize((_error: Error, _credentials: Credentials) => {
        if (_error) {
          console.error('GoogleDriveHelper.getAuthorizedClient::::: ', _error);
          _reject(_error);
        } else {
          console.log(
            'GoogleDriveService.setAuthorizedClient',
            'Successfully authenticated jwt client',
            _credentials
          );
          this._authorizedClient = _jwtClient;
          this._credentials = _credentials;
          _resolve(true);
        }
      });
    });
  }

  public getFileSize(_fileName: string, _callback: Callback): void {
    const _getFileSize = (): void => {
      const _drive = google.drive('v3');
      _drive.files.list(
        {
          auth: this._authorizedClient,
          q: `name contains '${_fileName}'`,
          fields: '*',
        },
        (_error: Error, _response: any) => {
          if (_error) {
            console.error('GoogleDriveHelper.getFileSize::::: ', _error);
            _callback(_error);
            return;
          }
          const _files: any[] = _response.data.files || [];
          if (!_files.length) {
            const _msg: string = `Could not find file with name: ${_fileName}`;
            console.error(_msg);
            _callback(new Error(_msg));
            return;
          }
          console.log('files::::: ', _files[0]);
          _callback(null, _files[0].size);
        }
      );
    };
    if (!this._authorizedClient) {
      this.setAuthorizedClient()
        .then(_getFileSize.bind(this))
        .catch((_error: Error) => _callback(_error));
    } else {
      _getFileSize();
    }
  }

  public downloadFile = (_fileId: string, _callback: Callback): void => {
    const _drive = google.drive('v3');
    _drive.files
      .get({
        fileId: _fileId,
        prettyPrint: true,
        auth: this._authorizedClient,
        fields: 'size',
      })
      .then((_response) => {
        console.log('get file response:::: ', _response);
        _callback(null, _response.data);
      })
      .catch((_error: Error) => {
        console.error('GoogleDriveHelper.downloadFile', _error);
        _callback(_error);
      });
  };
}

export const GoogleDriveService = new GoogleDriveServiceClass();
