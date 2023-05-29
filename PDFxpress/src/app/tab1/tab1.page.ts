import { Component } from '@angular/core';
import { PhotosService } from '../services/photos.service';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  photos: string[] = [];

  constructor(
    private photosServices: PhotosService,
    private storage: Storage,
    private userService: UserService
  ) {
    this.photos = this.photosServices.photos
  }

  ngOnInit(){
    this.getImages();
  }

  getImages() {
    // const userId = this.userService.currentUser.uid; // Obtener el ID del usuario actual

    const imagesRef = ref(this.storage, `images`);///${userId}

    listAll(imagesRef)
      .then(async response => {
        console.log(response);
        this.photos = [];
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          this.photos.push(url);
        }
      })
      .catch(error => console.log(error));
  }

  
}
