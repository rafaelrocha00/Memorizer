import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from './DataClass/Card';
import { map, mapTo, observable, Observable } from 'rxjs';
import { Kanji } from './DataClass/Kanji';
import { Deck } from './DataClass/Deck';
import { DeckService } from './deck.service';

@Injectable({
  providedIn: 'root'
})
export class KanjiService {

  usingKatakana : boolean = true
  callbacks : any[] = [];
  private kanjiAPIUrl : string = ""

  constructor(private http: HttpClient) { }

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

  public getEspecificKanki(kanji : string) : Observable<Card>{
    let urlToUse = 'https://kanjiapi.dev/v1/kanji/' + kanji
    return this.http.get<Kanji>(urlToUse).pipe(map((kanji: Kanji) => this.kanjiToCard(kanji)));
  }

  public getDataFromGradeFile(grade : string) : Observable<string>{
    return this.http.get('assets/' + grade, {responseType: 'text'});
  }

  public kanjiToCard(kanji : Kanji): Card {
    return new Card(new Date(), kanji.kanji, kanji.kun_readings[0]);
  } 

  public ListOfKanjiToCards(Kanjis : Kanji[]) : Card[]{
    let cards : Card[] = [];
    for(let index = 0; index < Kanjis.length; index++){
      cards.push(this.kanjiToCard(Kanjis[index]));
    }

    return cards;
  }

}
