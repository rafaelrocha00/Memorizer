import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../DataClass/Card';
import { map, mapTo, observable, Observable } from 'rxjs';
import { Kanji } from '../DataClass/Kanji';

@Injectable({
  providedIn: 'root'
})
export class KanjiService {

  usingKatakana : boolean = true
  callbacks : any[] = [];
  private kanjiAPIUrl : string = ""

  constructor(private http: HttpClient) { }

  public toggleKatakana(){
    this.usingKatakana = !this.isUsingKatakana()
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

  public getEspecificKanki(kanji : string) : Observable<Card>{
    let urlToUse = 'https://kanjiapi.dev/v1/kanji/' + kanji
    return this.http.get<Kanji>(urlToUse).pipe(map((kanji: Kanji) => this.kanjiToCard(kanji)));
  }

  public async getDataFromGradeFile(grade : string) : Promise<string>{
    const result = await fetch('assets/' + grade)
    return await result.text();
  }

  public kanjiToCard(kanji : Kanji): Card {
    return new Card(kanji.kanji, kanji.kun_readings[0]);
  } 

  public ListOfKanjiToCards(Kanjis : Kanji[]) : Card[]{
    let cards : Card[] = [];
    for(let index = 0; index < Kanjis.length; index++){
      cards.push(this.kanjiToCard(Kanjis[index]));
    }

    return cards;
  }

}
