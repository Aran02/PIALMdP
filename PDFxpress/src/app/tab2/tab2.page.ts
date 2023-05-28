import { Component } from '@angular/core';
import { PhotosService } from '../services/photos.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  photos: string[] = [];

  constructor(
    private photosService: PhotosService
  ) {
    this.photos = this.photosService.photos
  }

  async takePhoto(){
    await this.photosService.addNewPhoto();
  }
}
