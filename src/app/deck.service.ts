import { Injectable } from '@angular/core';
import { Card } from './DataClass/Card';
import { Deck } from './DataClass/Deck';
import { Kanji } from './DataClass/Kanji';
import { KanjiService } from './kanji.service';


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
    //TODO: Multiplas leituras possiveis de um kanji. Faça uma lista e compare os resultados, mostre todas as possibilidades.
    //TODO: Encontrar uma API que entregue as leituras Kun e o Kanji. Até lá, é isso aqui mesmo.
    let deck = new Deck("Mock Grade 1");
    deck.AddCard(new Card(new Date(), "日", "ひ"));
    deck.AddCard(new Card(new Date(), "一", "イチ"));
    deck.AddCard(new Card(new Date(), "人", "ひと"));
    deck.AddCard(new Card(new Date(), "年", "ネン"));
    deck.AddCard(new Card(new Date(), "大", " おおきい"));
    deck.AddCard(new Card(new Date(), "十", "とお"));
    deck.AddCard(new Card(new Date(), "二", "ニ"));
    deck.AddCard(new Card(new Date(), "本", "ホン"));
    deck.AddCard(new Card(new Date(), "中", "なか"));
    deck.AddCard(new Card(new Date(), "出", "でる"));
    deck.AddCard(new Card(new Date(), "三", "サン"));
    deck.AddCard(new Card(new Date(), "見", "みる"));
    deck.AddCard(new Card(new Date(), "五", "ゴ"));
    deck.AddCard(new Card(new Date(), "上", "うえ"));
    deck.AddCard(new Card(new Date(), "力", "ちから"));
    deck.AddCard(new Card(new Date(), "四", "よん"));
    deck.AddCard(new Card(new Date(), "生", "セイ"));
    return deck;
  }

  public GetIndexOf(deck : Deck){
    return this.decks.indexOf(deck);
  }

  public SetCurrentDeck(deck : Deck){
    this.currentDeck = this.GetIndexOf(deck);
  }
}