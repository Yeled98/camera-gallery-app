import { Injectable } from '@angular/core';

import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  // Key used to store the image list in preferences
  private readonly IMAGE_LIST_KEY = 'images';

  constructor() {}

  /**
   * Saves the image list to preferences.
   * @param imageList - An object containing image data, where keys are image identifiers and values are image URLs or paths.
   * @returns A promise that resolves when the operation is complete.
   * @throws Will throw an error if the operation fails.
   */
  async saveImageList(imageList: { [key: string]: string }): Promise<void> {
    try {
      await Preferences.set({
        key: this.IMAGE_LIST_KEY,
        value: JSON.stringify(imageList),
      });
    } catch (error) {
      throw new Error('Error saving image list to preferences: ' + error);
    }
  }

  /**
   * Retrieves the image list from preferences.
   * @returns A promise that resolves with the image list object, or an empty object if no data exists.
   * @throws Will throw an error if the operation fails.
   */
  async getImageList(): Promise<{ [key: string]: string }> {
    try {
      const result = await Preferences.get({ key: this.IMAGE_LIST_KEY });
      return result.value ? JSON.parse(result.value) : {};
    } catch (error) {
      throw new Error('Error getting image list from preferences: ' + error);
    }
  }

  /**
   * Clears the image list stored in preferences.
   * @returns A promise that resolves when the operation is complete.
   * @throws Will throw an error if the operation fails.
   */
  async clearImageList(): Promise<void> {
    try {
      await Preferences.remove({ key: this.IMAGE_LIST_KEY });
    } catch (error) {
      throw new Error('Error clearing image list in preferences: ' + error);
    }
  }
}
