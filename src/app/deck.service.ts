import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Card } from './DataClass/Card';
import { Deck } from './DataClass/Deck';
import { KanjiService } from './kanji.service';


@Injectable({
  providedIn: 'root'
})
export class DeckService {

  decks : Deck[] = [];
  currentDeck : number = -1;
  currentBiggerId : number = 0;

  constructor(private kanjiService : KanjiService) {
    let stringId = localStorage.getItem("currentBiggerId");
    if(stringId == undefined){
      this.currentBiggerId = 0;
      return;
    }

    this.currentBiggerId = +stringId;
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
    return this.getDeck(this.currentDeck);
  }

  public getCurrentDeckAsynch() : Observable<Deck>{
    this.getCurrentDeckIdFromMemory();
    let kanjiFileToGet = this.currentDeck + 1;
    return this.kanjiService.getDataFromGradeFile('KanjiGrade'+ kanjiFileToGet +'.csv').pipe(map(x => this.generateDeck(x, kanjiFileToGet, "Deck 1")));
  }

  importGradeDecks() : void{
    console.log("Getting all decks");
    this.kanjiService.getDataFromGradeFile('KanjiGrade1.csv').subscribe(x => this.generateDeck(x, 1, "Deck 1"));
    this.kanjiService.getDataFromGradeFile('KanjiGrade2.csv').subscribe(x => this.generateDeck(x, 2, "Deck 2"));
    this.kanjiService.getDataFromGradeFile('KanjiGrade3.csv').subscribe(x => this.generateDeck(x, 3, "Deck 3"));
    this.kanjiService.getDataFromGradeFile('KanjiGrade4.csv').subscribe(x => this.generateDeck(x, 4, "Deck 4"));
    this.kanjiService.getDataFromGradeFile('KanjiGrade5.csv').subscribe(x => this.generateDeck(x, 5, "Deck 5"));
    this.kanjiService.getDataFromGradeFile('KanjiGrade6.csv').subscribe(x => this.generateDeck(x, 6, "Deck 6"));
  }

  generateDeck(deck : string, id : number, name :string) : Deck{
    let deckFromCsv : Deck = this.csvToKanjiDeck(id, deck);
    deckFromCsv.name = name;
    this.decks.push(deckFromCsv);
    return deckFromCsv;
  }

  private csvToKanjiDeck(id : number,  file : string) : Deck{
   
    if(file === undefined){
      console.log("File is undefined");
    }

    let deck : Deck = new Deck(id, "Grade 1");
    let stringSeparada = file.split(/\r?\n/);
    console.log(stringSeparada.length);

    for(let index = 1; index < stringSeparada.length; index++){
      let stringSepareted : string[] = stringSeparada[index].split(';')
      if(stringSepareted[1] == undefined) continue;
      if(stringSepareted[3] == undefined) continue;

      deck.addCard(new Card(stringSepareted[1], stringSepareted[3]));
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

  public getNewId() : number {
    this.currentBiggerId++;
    localStorage.setItem("currentBiggerId", this.currentBiggerId.toString());
    return this.currentBiggerId;
  }
}