import { Injectable } from '@angular/core';
import { Card } from '../DataClass/Card';
import { Deck } from '../DataClass/Deck';
import { KanjiService } from './kanji.service';
import { RequestService } from './request.service';


@Injectable({
  providedIn: 'root'
})
export class DeckService {

  decks : Deck[] = []
  currentDeck : number = -1
  currentBiggestDeckId : number = 0

  loaded: boolean = false
  searchingDecks: boolean = false

  totalRevisions: number = 0
  cardsToRevise: number = 0
  cardsToLearn: number = 0

  constructor(private request: RequestService,private kanjiService : KanjiService) {
    let stringId = localStorage.getItem("currentBiggerId");
    if(!stringId){
      this.currentBiggestDeckId = 0;
      return;
    }

    this.currentBiggestDeckId = +stringId;
  }

  public getAllDecks() : Deck[]{
    if(this.shouldImportDecks()){
      this.importDecks();
    }

    return this.decks;
  }

  shouldImportDecks() : boolean{
    return !this.loaded;
  }

  public getDeck(index : number){
    return this.decks[index];
  }

  public async getDeckById(id : number) : Promise<Deck | null> {
    
    let deck = this.decks.find(x => x.id === id)
    if(deck){
      return deck
    }

    deck = await this.importDeck(id)

    return deck
  }


  public canGetDeck(){
    return !this.loaded
  }

  public getCurrentDeckIdFromMemory(){
    if(this.currentDeck == -1){
      let currentDeckInSave = localStorage.getItem("currentDeck");
      if(currentDeckInSave != null){
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

  createDeck(deck : any) : Deck {

    const deckObj = new Deck(deck._id, deck.name)

    deck.cards.forEach((card: any) => {
      const cardObject = new Card(card.frontText, card.backText, card.meanings, card._id)
      deckObj.addCard(cardObject)
    })

    return deckObj
  }

  async importDecks() : Promise<void>{
    this.decks = []
    this.searchingDecks = true
    const answer : any = await this.request.get('decks/')
    const deckArrays = answer.data.decks
    this.totalRevisions = answer.data.totalRevisions || 0
    this.cardsToRevise = answer.data.cardsToRevise || 0
    this.cardsToLearn = answer.data.cardsToLearn || 0

    for (let i = 0; i < deckArrays.length; i++) {
      const deck = deckArrays[i];
      const deckObj = this.createDeck(deck)
      this.decks.push(deckObj)
    }

    this.decks.sort((a, b) => {
      if(a.id < b.id){
        return -1
      }

      return 1
    } );

    this.loaded = true
    this.searchingDecks = false
  }

  async importDeck(id : number) : Promise<Deck>{
    const res : any = await this.request.get('decks/' + id)
    const deckObj = this.createDeck(res.data[0])
    this.decks.push(deckObj)
    return deckObj
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

      deck.addCard(new Card(stringSepareted[1], stringSepareted[3], []));
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
    if(!this.decks.length && !this.searchingDecks){
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