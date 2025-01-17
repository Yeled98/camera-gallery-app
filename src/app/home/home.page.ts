import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { ImageService } from '../services/image/image.service';
import { PreferencesService } from '../services/preferences/preferences.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  // Array to hold image URIs for display
  images!: string[];
  // Map to associate image names with file paths
  imageMap: { [key: string]: string } = {};

  constructor(
    private alertController: AlertController,
    private imageService: ImageService,
    private preferencesService: PreferencesService
  ) {}

  /**
   * Lifecycle hook: Initializes the component and loads stored images.
   */
  async ngOnInit(): Promise<void> {
    Camera.requestPermissions();
    try {
      const storedImages: { [key: string]: string } =
        await this.preferencesService.getImageList();
      this.imageMap = storedImages;
      this.images = await this.imageService.readImages(
        Object.keys(storedImages)
      );
    } catch (error) {
      console.error('Error loading saved images:', error);
    }
  }

  /**
   * Captures a new image using the device camera, saves it, and updates the UI.
   */
  async takePicture(): Promise<void> {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      const imageName = `image_${new Date().getTime()}.jpeg`;
      const imagePath: string = await this.imageService.saveImage(
        photo.base64String ?? '',
        imageName
      );

      if (!this.images) this.images = [];

      this.images.push(imagePath);
      this.imageMap[imageName] = imagePath;

      await this.preferencesService.saveImageList(this.imageMap);
    } catch (error) {
      console.error('Error capturing or saving picture:', error);
    }
  }

  /**
   * Deletes an image after user confirmation.
   * @param imageUri - The URI of the image to delete.
   */
  async deleteImage(imageUri: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Eliminar imagen',
      message: '¿Estás seguro de que deseas eliminar esta imagen?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: async () => {
            try {
              const imageName = Object.keys(this.imageMap).find(
                (key) => this.imageMap[key] === imageUri
              );

              if (imageName) {
                await this.imageService.deleteImage(imageName);
                delete this.imageMap[imageName];
                this.images = this.images.filter((img) => img !== imageUri);
                await this.preferencesService.saveImageList(this.imageMap);
              }
            } catch (error) {
              console.error('Error deleting picture:', error);
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
