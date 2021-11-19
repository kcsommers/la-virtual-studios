import { Callback, LAConstants } from '@la/core';
import { Credentials, JWT } from 'google-auth-library';
import { google } from 'googleapis';
import stream from 'stream';
import { IFileInfo } from '../file-info.interface';
import fs from 'fs';

class _GoogleDriveService {
  private SCOPES: string[] = ['https://www.googleapis.com/auth/drive'];

  private TOKEN_PATH: string = `${LAConstants.CREDENTIALS_DIRECTORY}/google-drive-token.json`;

  private SERVICE_ACCOUNT_KEY_PATH: string = `${LAConstants.CREDENTIALS_DIRECTORY}/google-drive-service-account.json`;

  private _jwtClient: JWT;

  public setAuthorizedClient(): Promise<void> {
    return new Promise((_resolve, _reject) => {
      this._jwtClient = new google.auth.JWT({
        keyFile: this.SERVICE_ACCOUNT_KEY_PATH,
        scopes: this.SCOPES,
      });
      fs.readFile(
        this.TOKEN_PATH,
        (_error: Error, _credentialsBuffer: Buffer) => {
          if (_error) {
            this._jwtClient.authorize(
              (_error: Error, _credentials: Credentials) => {
                if (_error) {
                  console.error(
                    'GoogleDriveHelper.getAuthorizedClient::::: ',
                    _error
                  );
                  _reject(_error);
                } else {
                  console.log(
                    'GoogleDriveService.setAuthorizedClient',
                    'Successfully authenticated jwt client',
                    _credentials
                  );
                  this._jwtClient.credentials = _credentials;
                  this.storeCredentials();
                  _resolve();
                }
              }
            );
          } else {
            console.log(
              'GoogleDriveService.setAuthorizedClient',
              'Found existing credentials'
            );
            const _credentials: Credentials = JSON.parse(
              _credentialsBuffer.toString()
            );
            this._jwtClient.credentials = _credentials;
            this.refreshTokenIfNeeded()
              .then(() => _resolve())
              .catch(() => _reject());
          }
        }
      );
    });
  }

  private refreshTokenIfNeeded(): Promise<void> {
    return new Promise((_resolve, _reject) => {
      const _currentTime = new Date().getTime();
      if (this._jwtClient.credentials.expiry_date > _currentTime) {
        _resolve();
      } else {
        console.log(
          'GoogleDriveHelper.refreshTokenIfNeeded',
          'Refreshing access token...'
        );
        this._jwtClient.refreshAccessToken(
          (_error: Error, _credentials: Credentials) => {
            if (_error) {
              console.error('GoogleDriveHelper.refreshTokenIfNeeded', _error);
              _reject();
              return;
            }
            console.log(
              'GoogleDriveHelper.refreshTokenIfNeeded',
              'Successfully refreshed access token'
            );
            this._jwtClient.credentials = _credentials;
            this.storeCredentials();
            _resolve();
          }
        );
      }
    });
  }

  public getFileInfo(_fileName: string, _callback: Callback<IFileInfo>): void {
    const _getFileSize = (): void => {
      const _drive = google.drive('v3');
      _drive.files.list(
        {
          auth: this._jwtClient,
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
          _callback(null, {
            name: _fileName,
            id: _files[0].id,
            size: _files[0].size,
            webContentLink: _files[0].webContentLink,
            webViewLink: _files[0].webViewLink,
          });
        }
      );
    };
    if (!this._jwtClient) {
      this.setAuthorizedClient()
        .then(_getFileSize.bind(this))
        .catch((_error: Error) => _callback(_error));
    } else {
      _getFileSize();
    }
  }

  public getReadableStream = (
    _fileId: string,
    _callback: Callback<stream.Readable>
  ): void => {
    const _drive = google.drive('v3');
    _drive.files.get(
      {
        fileId: _fileId,
        alt: 'media',
        prettyPrint: true,
        auth: this._jwtClient,
      },
      {
        responseType: 'stream',
      },
      (_error: Error, _response) => {
        if (_error) {
          console.error('GoogleDriveHelper.getReadableStream', _error);
          _callback(_error);
          return;
        }
        console.log(
          'GoogleDriveHelper.getReadableStream',
          `Successfully got readable stream for ${_fileId}`
        );
        _callback(null, _response.data as stream.Readable);
      }
    );
  };

  private storeCredentials(): void {
    fs.writeFile(
      this.TOKEN_PATH,
      JSON.stringify(this._jwtClient.credentials),
      (_error: Error) => {
        if (_error) {
          console.error('GoogleDriveService.storeCredentials', _error);
        }
      }
    );
  }
}

export const GoogleDriveService = new _GoogleDriveService();
