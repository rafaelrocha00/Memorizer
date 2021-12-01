import { identifierModuleUrl } from '@angular/compiler';
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
  constructor(private kanjiService : KanjiService) { }

  public CreateDecks(){

  }

  public GetAllDecks() : Deck[]{
    if(this.decks.length == 0){
      this.getGradeDecks()
    }

    return this.decks;
  }

  public GetDeck(index : number){

    if(this.decks.length == 0){
      this.getGradeDecks()
    }

    return this.decks[index];
  }

  public GetCurrentDeck(){
    return this.GetDeck(this.currentDeck);
  }

  CreateMockUpDeck() : Deck{
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

  getGradeDecks() : void{
    this.kanjiService.getDataFromGradeFile('KanjiGrade1.csv').subscribe(x => this.GenerateDeck(x, "Grade 1"));
    this.kanjiService.getDataFromGradeFile('KanjiGrade2.csv').subscribe(x => this.GenerateDeck(x, "Grade 2"));
    this.kanjiService.getDataFromGradeFile('KanjiGrade3.csv').subscribe(x => this.GenerateDeck(x, "Grade 3"));

  }

  GenerateDeck(deck : string, name :string) : void{
    let Deck : Deck = this.csvToKanjiDeck(deck);
    Deck.name = name;
    this.decks.push(Deck);
  }

  private csvToKanjiDeck(file : string) : Deck{
   
    if(file === undefined){
      console.log("File is undefined");
    }else{
      console.log(file);
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

  public GetIndexOf(deck : Deck){
    return this.decks.indexOf(deck);
  }

  public SetCurrentDeck(deck : Deck){
    this.currentDeck = this.GetIndexOf(deck);
  }
}