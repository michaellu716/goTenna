import { Component, OnInit } from '@angular/core';
import {GalleryService} from './../gallery.service';
import { Lightbox } from 'ngx-lightbox';
import { LightboxConfig } from 'ngx-lightbox';
// import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  private _album: any = [];
  grayScaleurl: any = [];
  GalleryData: any;
  grayScale: Boolean;
  array = [];
  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 150;
  direction = '';
  modalOpen = false;
  scale = false;
  constructor(private galleryService:GalleryService, private _lightboxConfig: LightboxConfig,private _lightbox: Lightbox ) { 
  }
  
  ngOnInit() {
    this.galleryService.getImages(this.scrollDistance).subscribe(data => 
      {
        this.GalleryData = data;
        console.log(data)
        this.GalleryData.forEach(element => {
          const album = {
            src:  element.url,
            caption: '',
            width: element.width,
            thumb: element.url
         };
          this._album.push(album);
        });
        // console.log(this.GalleryData[0].url)
        
    })
  }

  open(index: number) {
    this._lightbox.open(this._album, index, { wrapAround: true, showImageNumberLabel: true });
  }

//Getting Grasyscale images
convert_grayscale(){
  this.scale = !this.scale;
  let part = '';
  if(this.scale){
    part = '?grayscale';
  }
  this._album = [];
  this.GalleryData.forEach(element => {
    const album = {
      src:  element.url+part,
      caption: '',
      width: element.width,
      thumb: element.url+part
   };
    this._album.push(album);
  });

}
onScrollDown (ev) {
    this.direction = 'down';
    this.scrollDistance++;
    this.galleryService.getImages(ev+1).subscribe( data =>{
  
      if(data > 0){
      this.GalleryData = data;
      this.GalleryData.forEach(element => {
        const album = {
          src:  element.url,
          caption: '',
          width: element.width,
          thumb: element.url
       };
       this._album.push(album);
      });
   }
  });
} 
onUp(ev) {
    const start = this.sum;
    this.sum += 20;
    this.direction = 'up';
  }
  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }
  
}
