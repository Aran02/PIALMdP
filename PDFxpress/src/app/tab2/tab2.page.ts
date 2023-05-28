import { Component } from '@angular/core';
import { PhotosService } from '../services/photos.service';

import { Storage, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  photos: string[];

  constructor(
    private photosService: PhotosService,
    private storage: Storage
  ) {
    this.photos = []
  }

  async takePhoto(){
    await this.photosService.addNewPhoto();
    const latestPhoto = this.photosService.photos[0];
    this.uploadPhoto(latestPhoto);
  }

  // uploadImage($event: any) {
  //   const file = $event.target.files[0];
  //   console.log(file);

  //   const imgRef = ref(this.storage, `images/${file.name}`);

  //   uploadBytes(imgRef, file)
  //     .then(response => {
  //       console.log(response)
  //       // this.getImages();
  //     })
  //     .catch(error => console.log(error));
      
      
  // }

  async uploadPhoto(photo: string) {
    const imgRef = ref(this.storage, `images/${photo}`);

    const response = await fetch(photo);
    const blob = await response.blob();

    // Realiza el proceso de carga de la foto a tu almacenamiento aquí
    uploadBytes(imgRef, blob)
      .then(uploadTaskSnapshot => {
        console.log('Upload is complete!', uploadTaskSnapshot);
        // this.getImages();
      })
      .catch(error => console.error('Error uploading image:', error));
  }
}