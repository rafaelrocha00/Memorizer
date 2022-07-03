import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Card } from '../DataClass/Card';
import { Deck } from '../DataClass/Deck';
import { KanjiService } from './kanji.service';


@Injectable({
  providedIn: 'root'
})
export class DeckService {

  decks : Deck[] = [];
  currentDeck : number = -1;
  currentBiggestDeckId : number = 0;

  constructor(private kanjiService : KanjiService) {
    let stringId = localStorage.getItem("currentBiggerId");
    if(stringId == undefined){
      this.currentBiggestDeckId = 0;
      return;
    }

    this.currentBiggestDeckId = +stringId;
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
    this.kanjiService.getDataFromGradeFile('KanjiGrade1.csv').subscribe(x => this.generateDeck(x, 1, "Grade 1"));
    this.kanjiService.getDataFromGradeFile('KanjiGrade2.csv').subscribe(x => this.generateDeck(x, 2, "Grade 2"));
    this.kanjiService.getDataFromGradeFile('KanjiGrade3.csv').subscribe(x => this.generateDeck(x, 3, "Grade 3"));
    this.kanjiService.getDataFromGradeFile('KanjiGrade4.csv').subscribe(x => this.generateDeck(x, 4, "Grade 4"));
    this.kanjiService.getDataFromGradeFile('KanjiGrade5.csv').subscribe(x => this.generateDeck(x, 5, "Grade 5"));
    this.kanjiService.getDataFromGradeFile('KanjiGrade6.csv').subscribe(x => this.generateDeck(x, 6, "Grade 6"));
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

  public getNewDeckId() : number {
    this.currentBiggestDeckId++;
    localStorage.setItem("currentBiggerId", this.currentBiggestDeckId.toString());
    return this.currentBiggestDeckId;
  }

  public getAllKanjisOfReading(val : string, maxNumber : number = 10) : string[] {
    let result : string[] = []
    if(!this.decks.length){
      this.getAllDecks()
    }
    
    for (let index = 0; index < this.decks.length; index++) {
      const element = this.decks[index];
      const readings = element.getAllKanjisOfReading(val);
      result = result.concat(...readings)
      if(result.length >= maxNumber) {
        result = result.slice(0, maxNumber); 
        return result;
      }
      
    }
    return result
  }
}