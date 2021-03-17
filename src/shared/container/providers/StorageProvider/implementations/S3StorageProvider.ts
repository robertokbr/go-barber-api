import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

import uploadConfig from '@config/upload';
import storage from '@config/storage';

class S3StorageProvider implements IStorageProvider {
  private cliente: S3;

  constructor() {
    this.cliente = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(fileName: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, fileName);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.cliente
      .putObject({
        Bucket: storage.bucket,
        ACL: 'public-read',
        Key: fileName,
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return fileName;
  }

  public async deleteFile(fileName: string): Promise<void> {
    await this.cliente
      .deleteObject({
        Bucket: storage.bucket,
        Key: fileName,
      })
      .promise();
  }
}

export default S3StorageProvider;
