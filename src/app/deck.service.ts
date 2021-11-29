import { Injectable } from '@angular/core';
import { Card } from './DataClass/Card';
import { Deck } from './DataClass/Deck';


@Injectable({
  providedIn: 'root'
})
export class DeckService {

  decks : Deck[] = [];
  currentDeck : number = 0;
  constructor() { }

  public CreateDecks(){

  }

  public GetAllDecks() : Deck[]{
    if(this.decks.length == 0){
      this.decks.push(this.CreateMockUpDeck());
      return this.decks;
    }

    return this.decks;
  }

  public GetDeck(index : number){

    if(this.decks.length == 0){
      this.decks.push(this.CreateMockUpDeck());
    }

    return this.decks[index];
  }

  public GetCurrentDeck(){
    return this.GetDeck(this.currentDeck);
  }

  CreateMockUpDeck(){
    let deck = new Deck("Kanji G1-Kun");
    deck.AddCard(new Card(new Date(), "漢字", "yesterday"));
    deck.AddCard(new Card(new Date(), "日", "day"));
    deck.AddCard(new Card(new Date(), "日時", "date"));
    deck.AddCard(new Card(new Date(), "毎日", "every day"));
    return deck;
  }

  public GetIndexOf(deck : Deck){
    return this.decks.indexOf(deck);
  }

  public SetCurrentDeck(deck : Deck){
    this.currentDeck = this.GetIndexOf(deck);
  }
}