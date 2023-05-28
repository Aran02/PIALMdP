import { Component } from '@angular/core';
import { PhotosService } from '../services/photos.service';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  photos: string[] = [];

  constructor(
    private photosServices: PhotosService,
    private storage: Storage
  ) {
    this.photos = this.photosServices.photos
  }

  ngOnInit(){
    this.getImages();
  }

  getImages() {
    const imagesRef = ref(this.storage, 'images');

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
