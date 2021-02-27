class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(fileName: string): Promise<string> {
    this.storage.push(fileName);

    return fileName;
  }

  public async deleteFile(fileName: string): Promise<void> {
    const fileIndex = this.storage.findIndex(file => file === fileName);

    this.storage.splice(fileIndex, 1);
  }
}

export default FakeStorageProvider;
