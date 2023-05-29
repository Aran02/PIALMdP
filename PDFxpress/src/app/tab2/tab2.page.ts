import { Component } from '@angular/core';
import { PhotosService } from '../services/photos.service';

import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { UserService } from '../services/user.service';

import jsPDF from 'jspdf';

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

        // Convertir la imagen a PDF
        this.convertToPdf(photo);
      })
      .catch(error => console.error('Error uploading image:', error));
  }

  convertToPdf(photo: string) {
    const doc = new jsPDF();
    const img = new Image();
  
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
  
      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = canvas.toDataURL('image/jpeg');
  
        doc.addImage(imageData, 'JPEG', 10, 10, 190, 250); // Ajusta las dimensiones según tus necesidades
        doc.save('photo.pdf');
      } else {
        console.error('No se pudo obtener el contexto del lienzo');
      }
    };
  
    img.src = photo;
  }
}