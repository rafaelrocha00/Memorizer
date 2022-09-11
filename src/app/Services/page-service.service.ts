import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageServiceService {

  maxItensOnPage: number = 15

  constructor() { }
}
