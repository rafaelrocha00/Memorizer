import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Card } from '../DataClass/Card';
import { Deck } from '../DataClass/Deck';
import { DeckService } from '../deck.service';
import * as wanakana from 'wanakana';
import { KanjiService } from '../kanji.service';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
  selector: 'app-revise-deck-page',
  templateUrl: './revise-deck-page.component.html',
  styleUrls: ['./revise-deck-page.component.css']
})
export class ReviseDeckPageComponent implements OnInit {

  cardIsTurned: boolean = false
  revisionEnded: boolean = false
  currentFrontText: string = "";
  currentBackText: string = "";
  backCardColor : string = "#243955";
  wrongAnswerColor : string = "#6B1E1E";
  correctAnswerColor : string = "#257419";

  currentDeck : Deck;
  currentCard: Card | undefined;
  currentCardId: number = 0

  inputElement : HTMLInputElement | undefined
  textInput : string = "";
  inputIsUsingKatakana : boolean = true;

  constructor(private deckService : DeckService, private kanjiService : KanjiService, private routeService : Router) {
    this.currentDeck = this.deckService.getCurrentDeck();
  }

  ngOnInit(): void {
    if(this.currentDeck.getLenght() == 0) return;

    this.inputElement = document.getElementById('wanakana-input') as HTMLInputElement;
    
    if(this.inputElement != null){
      if(this.kanjiService.isUsingKatakana()){
        wanakana.bind(this.inputElement);
      }

      this.inputElement.focus();
      this.kanjiService.onChange( this.bindInputToWanakana.bind(this));
    }

    this.revisionEnded = false;
    this.changeCardByIndex(0);
  }

  changeCard(){
      this.textInput = "";
      this.cardIsTurned = false;
      this.currentCardId++;
      this.backCardColor = "#243955";

      if(this.currentCardId >= this.currentDeck.getLenght()){
        this.revisionEnded = true;
        this.currentFrontText = "You saw all Cards!";
        return;
      }

      this.changeCardByIndex(this.currentCardId);
      console.log("Carta mudou");
  }

  changeCardByIndex(index : number){
    this.currentCard = this.currentDeck.getCard(index);
    this.currentFrontText = this.currentCard.frontText;
    this.currentBackText = this.currentCard.backText;
  }

  turnCard(){
    if(this.cardIsTurned){
      this.changeCard();
      return;
    }

    this.cardIsTurned = true;
    this.textInput = this.currentBackText;
    this.backCardColor = this.wrongAnswerColor;
    this.currentCard?.addMistake();
  }

  checkInput(){   
    if(this.cardIsTurned){
      return;
    }

      let inputCorrigida : string = this.textInput.toLowerCase().trim();
      inputCorrigida = wanakana.toRomaji(inputCorrigida);
      let inputRequerida : string = this.currentBackText.toLowerCase().trim();
      inputRequerida = wanakana.toRomaji(inputRequerida);
      let inputrequeridaDividida : string[] = inputRequerida.split(',');

      console.log(inputRequerida);

      for(let index = 0; index < inputrequeridaDividida.length; index++){
        if(inputCorrigida == inputrequeridaDividida[index])
        {
          if(this.currentCard == undefined){
            console.error("There is no card in revision.");
            return;
          }

          this.backCardColor = this.correctAnswerColor;
          this.cardIsTurned = true;
          this.currentCard.addHit();
          this.currentCard.saveCard(this.currentDeck.id);
          break;
        }
      }
     
  }


  bindInputToWanakana(){
    if(this.inputElement == undefined){
      this.inputElement = document.getElementById('wanakana-input') as HTMLInputElement;
    }

    if(this.kanjiService.isUsingKatakana() && !this.inputIsUsingKatakana){
      wanakana.bind(this.inputElement );
      this.inputIsUsingKatakana = true;
    }

    if(!this.kanjiService.isUsingKatakana() && this.inputIsUsingKatakana){
      wanakana.unbind(this.inputElement);
      this.inputIsUsingKatakana = false;
      this.inputElement.value = wanakana.toRomaji(this.inputElement.value);
    }
  }

  changePageToMainPage(){
    this.routeService.navigate([""]);
  }
}
