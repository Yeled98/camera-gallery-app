# Home Image Manager

Home Image Manager is a mobile application built with Ionic and Angular. This app allows users to capture, save, and manage images directly from their devices. It uses Capacitor plugins to handle file storage and device camera access.

## Features

- **Capture Images:** Take photos using the device camera.
- **Save Locally:** Images are stored locally in the app's storage.
- **View Images:** Display saved images in a gallery format.
- **Delete Images:** Remove unwanted images.
- **Persistent Storage:** The app uses Capacitor Preferences to save image metadata for future sessions.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd camera-gallery-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Add the desired platform (e.g., Android):
   ```bash
   ionic capacitor add android
   ```
5. Build the project:
   ```bash
   ionic build
   ```
6. Sync Capacitor plugins:
   ```bash
   ionic capacitor sync
   ```
7. Open the platform-specific IDE (e.g., Android Studio for Android):
   ```bash
   ionic capacitor open android
   ```
8. Build and run the app on your device.

## APK Download

The signed APK for the app is available for download at the following link:
[Download APK](https://drive.google.com/file/d/1MfJEocTdkXjsx50QKYCtWzoX9pPGiYgX/view?usp=sharing)

## Technologies Used

- **Ionic Framework**: For building the app's UI.
- **Angular**: For app logic and state management.
- **Capacitor**: To access native device functionality.
- **Typescript**: For type-safe coding.

## File Structure

- `src/app/home/`: Contains the Home page and its components.
- `src/app/services/`: Includes service files for handling preferences and image management.

## How It Works

1. The user captures an image using the device camera.
2. The image is saved in the app's storage using Capacitor Filesystem.
3. Metadata about the saved image is stored in Capacitor Preferences.
4. Users can view, delete, or manage their saved images.
