import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from './../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(  private http: HttpClient) { }
  
  getImages(postsPerPage: number){
    const queryParams = `?pageNo=${postsPerPage}`;
    console.log(postsPerPage);
    const url = environment.server_URl+ 'api/photos'+ queryParams;
    return this.http.get(url)
  }

  

}
