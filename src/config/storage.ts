interface IStorageConfig {
  bucket: string;
  driver: 's3' | 'disk';
}

export default {
  bucket: process.env.AWS_BUCKET,
  driver: process.env.STORAGE_DRIVER,
} as IStorageConfig;
