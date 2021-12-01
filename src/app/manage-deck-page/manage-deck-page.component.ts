import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as wanakana from 'wanakana';
import { Card } from '../DataClass/Card';
import { Deck } from '../DataClass/Deck';
import { DeckService } from '../deck.service';

@Component({
  selector: 'app-manage-deck-page',
  templateUrl: './manage-deck-page.component.html',
  styleUrls: ['./manage-deck-page.component.css']
})
export class ManageDeckPageComponent implements OnInit {

  addingNewCard : boolean = false;
  currentDeck : Deck | undefined;
  cards : Card[] = [];
  filteredCards : Card[] = []
  currentElementInList : Card;
  stringToSearch : HTMLInputElement | undefined;

  constructor(private deckService : DeckService, private routeService : Router) { 
    this.currentElementInList = new Card(new Date(),"","");
  }

  ngOnInit(): void {
    this.currentDeck = this.deckService.GetCurrentDeck();
    this.cards = this.currentDeck.GetAllCards();
    this.stringToSearch = document.getElementById("searchBoxContainer") as HTMLInputElement;
    this.filteredCards = this.cards;
  }

  onClick(){

  }

  abrirMenuAdicionarCarta(){
    this.addingNewCard = true;
  }

  fecharMenuAdicionarCarta(){
    this.addingNewCard = false;
  }

  abrirRouteRevisarDeck(){
    this.routeService.navigate(["reviseDeck"])
  }

  deletarCarta(cardToRemove : Card){
    this.currentDeck?.DeleteCard(cardToRemove);
  }

  checkInput(){
    this.changeCardsToShowInList();
  }

  changeCardsToShowInList(): void {

    if(this.stringToSearch == undefined) return;
    if(this.stringToSearch?.value == ""){
      console.log("filter string: " + this.stringToSearch);
      this.filteredCards = this.cards;
    }

    this.filteredCards = [];
    for(let index = 0; index < this.cards.length; index++){

      let currentBackText = wanakana.toRomaji(this.cards[index].backText);
      let frontText = wanakana.toRomaji(this.cards[index].frontText);
      let inputString = wanakana.toRomaji(this.stringToSearch.value);
      if(currentBackText.includes(inputString) || frontText.includes(inputString)){
        this.filteredCards.push(this.cards[index]);
      }
    }

  } 
}
