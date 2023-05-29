import { Component } from '@angular/core';
import { PhotosService } from '../services/photos.service';

import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  photos: string[];

  constructor(
    private photosService: PhotosService,
    private storage: Storage,
    private userService: UserService
  ) {
    this.photos = [];
  }

  async takePhoto() {
    await this.photosService.addNewPhoto();
    const latestPhoto = this.photosService.photos[0];
    this.uploadPhoto(latestPhoto);
  }

  async uploadPhoto(photo: string) {

    const userId = this.userService.currentUser.uid; // Obtener el ID del usuario actual


    // const imgRef = ref(this.storage, `images/${photo}`);
    const imgRef = ref(this.storage, `images/${userId}/${photo}`); // Crear una carpeta única para el usuario

    const response = await fetch(photo);
    const blob = await response.blob();

    uploadBytes(imgRef, blob)
      .then(uploadTaskSnapshot => {
        console.log('Upload is complete!', uploadTaskSnapshot);
        // this.getImages();
      })
      .catch(error => console.error('Error uploading image:', error));
  }
}