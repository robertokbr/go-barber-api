import ICacheProvider from '../models/ICacheProvider';

interface ICachData {
  [key: string]: string;
}

class FakeCacheProvider implements ICacheProvider {
  private cache = {} as ICachData;

  public async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async recover<T>(key: string): Promise<T | null> {
    return this.cache[key] ? JSON.parse(this.cache[key]) : null;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.cache).filter(key =>
      key.startsWith(`${prefix}:`),
    );

    keys.forEach(key => {
      delete this.cache[key];
    });
  }
}

export default FakeCacheProvider;
