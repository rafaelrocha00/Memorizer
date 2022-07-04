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
    return !this.decks.length;
  }

  public getDeck(index : number){

    if(this.shouldImportDecks()){
      this.importGradeDecks()
      console.log("Decks on memory: " + this.decks.length);
    }

    return this.decks[index];
  }

  public async getDeckById(id : number) : Promise<Deck | null> {
    if(this.shouldImportDecks()){
      await this.importGradeDecks()
      console.log("Decks on memory: " + this.decks.length);
    }
    
    for (let i = 0; i < this.decks.length; i++) {
      const element = this.decks[i];
      if(element.id != id) {
        continue;
      }
      
      console.log('returning ' + element.id)
      return element;
    }

    return null
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

    return this.currentDeck
  }

  public getCurrentDeck(){
    this.getCurrentDeckIdFromMemory();
    return this.getDeck(this.currentDeck);
  }

  public async getCurrentDeckAsync() : Promise<Deck>{
    this.getCurrentDeckIdFromMemory();
    let kanjiFileToGet = this.currentDeck + 1;
    const text = await this.kanjiService.getDataFromGradeFile('KanjiGrade' + kanjiFileToGet + '.csv');
    const deck = this.generateDeck(text, kanjiFileToGet, "Deck 1")
    return deck;
  }

  async importGradeDecks() : Promise<void>{
    console.log("Getting all decks");
    for (let index = 1; index <= 6; index++) {
      const deck = await this.kanjiService.getDataFromGradeFile('KanjiGrade' + index + '.csv')
      this.generateDeck(deck, index, "Grade " + index)
    }
  }

  generateDeck(deck : string, id : number, name :string) : Deck{
    let deckFromCsv : Deck = this.csvToKanjiDeck(id, deck);
    deckFromCsv.name = name;
    deckFromCsv.id = id;
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