import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  storage = window.localStorage;

  constructor() {
    this.initializeUnlessDefined();
  }

  public getStorage(field): any {
    let s = this.storage.getItem('d');
    s = JSON.parse(s);
    return s[field];
  }

  public setStorage(field, value): any {
    let s = this.storage.getItem('d');
    let o = JSON.parse(s);
    o[field] = value;
    this.storage.setItem('d', JSON.stringify(o));
  }

  initializeUnlessDefined() {
    if (!this.storage.getItem('d')) {
      this.storage.setItem('d', JSON.stringify({}));
    }
  }

}
