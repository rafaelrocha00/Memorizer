import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, Subscription, } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators'
import { Card } from './DataClass/Card';
import { Deck } from './DataClass/Deck';
import { KanjiService } from './kanji.service';


@Injectable({
  providedIn: 'root'
})
export class DeckService {

  decks : Deck[] = [];
  currentDeck : number = -1;
  constructor(private kanjiService : KanjiService) { }


  public createDecks(){

  }

  public getAllDecks() : Deck[]{
    if(this.shouldImportDecks()){
      this.importGradeDecks();
    }

    return this.decks;
  }

  shouldImportDecks() : boolean{
    return this.decks.length < 6;
  }

  public getDeck(index : number){

    if(this.shouldImportDecks()){
      this.importGradeDecks()
      console.log("Decks on memory: " + this.decks.length);
    }

    return this.decks[index];
  }

  public canGetDeck(){
    return this.decks.length > 0;
  }

  public getCurrentDeckIdFromMemory(){
    if(this.currentDeck == -1){
      let currentDeckInSave = localStorage.getItem("currentDeck");
      if(currentDeckInSave != null){
        console.log("Found deck in memory");
        this.currentDeck = +currentDeckInSave;
      }
    }
  }

  public getCurrentDeck(){
    this.getCurrentDeckIdFromMemory();
    console.log("returning: " + this.currentDeck);
    console.log("Decks on memory: " + this.decks.length);
    return this.getDeck(this.currentDeck);
  }

  public getCurrentDeckAsynch() : Observable<Deck>{
    this.getCurrentDeckIdFromMemory();
    let kanjiFileToGet = this.currentDeck + 1;
    return this.kanjiService.getDataFromGradeFile('KanjiGrade'+ kanjiFileToGet +'.csv').pipe(map(x => this.generateDeck(x, "Deck 1")));
  }

  importGradeDecks() : void{
    console.log("Getting all decks");
    this.kanjiService.getDataFromGradeFile('KanjiGrade1.csv').subscribe(x => this.generateDeck(x, "Deck 1"));
    this.kanjiService.getDataFromGradeFile('KanjiGrade2.csv').subscribe(x => this.generateDeck(x, "Deck 2"));
    this.kanjiService.getDataFromGradeFile('KanjiGrade3.csv').subscribe(x => this.generateDeck(x, "Deck 3"));
    this.kanjiService.getDataFromGradeFile('KanjiGrade4.csv').subscribe(x => this.generateDeck(x, "Deck 4"));
    this.kanjiService.getDataFromGradeFile('KanjiGrade5.csv').subscribe(x => this.generateDeck(x, "Deck 5"));
    this.kanjiService.getDataFromGradeFile('KanjiGrade6.csv').subscribe(x => this.generateDeck(x, "Deck 6"));
  }

  generateDeck(deck : string, name :string) : Deck{
    let deckFromCsv : Deck = this.csvToKanjiDeck(deck);
    deckFromCsv.name = name;
    this.decks.push(deckFromCsv);
    return deckFromCsv;
  }

  private csvToKanjiDeck(file : string) : Deck{
   
    if(file === undefined){
      console.log("File is undefined");
    }

    let deck : Deck = new Deck("Grade 1");
    let stringSeparada = file.split(/\r?\n/);
    console.log(stringSeparada.length);

    for(let index = 1; index < stringSeparada.length; index++){
      let stringSepareted : string[] = stringSeparada[index].split(';')
      if(stringSepareted[1] == undefined) continue;
      if(stringSepareted[3] == undefined) continue;

      deck.AddCard(new Card(new Date(), stringSepareted[1], stringSepareted[3]));
    }
    return deck;
  }

  public getIndexOf(deck : Deck){
    return this.decks.indexOf(deck);
  }

  public setCurrentDeck(deck : Deck){
    this.currentDeck = this.getIndexOf(deck);
    localStorage.setItem("currentDeck", this.currentDeck.toString());
  }
}