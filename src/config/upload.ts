import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

interface IUploadConfig {
  tmpFolder: string;
  uploadFolder: string;
  config: {
    multer: {
      storage: StorageEngine;
    };
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  uploadFolder: path.resolve(tmpFolder, 'uploads'),
  config: {
    multer: {
      storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
          const fileHash = crypto.randomBytes(10).toString('HEX');
          const fileName = `${fileHash}-${file.originalname
            .split(' ')
            .join('_')}`;
          return callback(null, fileName);
        },
      }),
    },
  },
} as IUploadConfig;
