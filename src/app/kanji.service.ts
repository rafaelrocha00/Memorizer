import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KanjiService {

  usingKatakana : boolean = false
  callbacks : any[] = [];

  constructor() { }

  public useKatakana(use : boolean){
    this.usingKatakana = use;
    console.log("using kana");

    this.callBackOnKanaChange();
  }


  public isUsingKatakana() : boolean{
    return this.usingKatakana;
  }

  public onChange(callback : any){
      this.callbacks.push(callback);
  }

  private callBackOnKanaChange(){
    if(this.callbacks == undefined) return;
    for(let index = 0; index < this.callbacks.length; index++){
      this.callbacks[index]();
    }
  }

}
