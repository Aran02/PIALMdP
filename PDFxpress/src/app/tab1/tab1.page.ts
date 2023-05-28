import { Component } from '@angular/core';
import { PhotosService } from '../services/photos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  photos: string[] = [];

  constructor(
    private photosServices: PhotosService
  ) {
    this.photos = this.photosServices.photos
  }


}
