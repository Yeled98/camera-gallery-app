import { Injectable } from '@angular/core';

import { Filesystem, Directory, ReaddirResult } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly IMAGE_DIR = 'images';

  constructor() {}

  /**
   * Saves a base64-encoded image to the filesystem.
   * @param base64Data - The base64 string of the image.
   * @param fileName - The name of the file to save.
   * @returns A promise resolving to the image URI.
   * @throws Will throw an error if saving fails.
   */
  async saveImage(base64Data: string, fileName: string): Promise<string> {
    try {
      await this.ensureDirectoryExists();

      await Filesystem.writeFile({
        path: `${this.IMAGE_DIR}/${fileName}`,
        data: base64Data,
        directory: Directory.Data,
      });

      const fileUri = await Filesystem.readFile({
        path: `${this.IMAGE_DIR}/${fileName}`,
        directory: Directory.Data,
      });

      return 'data:image/jpeg;base64,' + fileUri.data;
    } catch (error) {
      console.error('Error saving image:', error);
      throw error;
    }
  }

  /**
   * Deletes an image file from the filesystem.
   * @param fileName - The name of the file to delete.
   * @returns A promise that resolves when the file is deleted.
   * @throws Will throw an error if deleting fails.
   */
  async deleteImage(fileName: string): Promise<void> {
    try {
      await Filesystem.deleteFile({
        path: `${this.IMAGE_DIR}/${fileName}`,
        directory: Directory.Data,
      });
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }

  /**
   * Reads and returns URIs for a list of stored images.
   * @param storedImages - An array of image names to read.
   * @returns A promise resolving to an array of image URIs.
   * @throws Will throw an error if reading fails.
   */
  async readImages(storedImages: string[]): Promise<string[]> {
    try {
      const uris: string[] = [];

      for (const imageName of storedImages) {
        const fileUri = await Filesystem.readFile({
          path: `${this.IMAGE_DIR}/${imageName}`,
          directory: Directory.Data,
        });
        uris.push('data:image/jpeg;base64,' + fileUri.data);
      }

      return uris;
    } catch (error) {
      console.error('Error listing images:', error);
      throw error;
    }
  }

  /**
   * Ensures the image directory exists, creating it if necessary.
   */
  private async ensureDirectoryExists(): Promise<void> {
    try {
      await Filesystem.readdir({
        path: this.IMAGE_DIR,
        directory: Directory.Data,
      });
    } catch (error) {
      await Filesystem.mkdir({
        path: this.IMAGE_DIR,
        directory: Directory.Data,
        recursive: true,
      });
    }
  }
}
