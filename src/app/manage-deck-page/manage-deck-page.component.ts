import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as wanakana from 'wanakana';
import { Card } from '../DataClass/Card';
import { Deck } from '../DataClass/Deck';
import { DeckService } from '../deck.service';

@Component({
  selector: 'app-manage-deck-page',
  templateUrl: './manage-deck-page.component.html',
  styleUrls: ['./manage-deck-page.component.css']
})
export class ManageDeckPageComponent implements OnInit, OnDestroy {

  addingNewCard : boolean = false;
  currentDeck : Deck | undefined;
  cards : Card[] = [];
  filteredCards : Card[] = []
  currentElementInList : Card;
  stringToSearch : HTMLInputElement | undefined;
  subscription : Subscription | undefined;
  totalPorcentage : string = "0";
  porcentageCircle: number[] = [100, 100]

  constructor(private deckService : DeckService, private routeService : Router) { 
    this.currentElementInList = new Card("","");
  }

  ngOnInit(): void {
    if(this.deckService.canGetDeck()){
      this.setDeck(this.deckService.getCurrentDeck());
    }else{
      this.subscription = this.deckService.getCurrentDeckAsynch().subscribe(this.setDeck.bind(this));
    }
    this.stringToSearch = document.getElementById("searchBoxContainer") as HTMLInputElement;
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  setDeck(newDeck: Deck){
    console.log(newDeck.getLenght());
    this.currentDeck = newDeck;
    this.cards = newDeck.getAllCards();
    this.filteredCards = this.cards;
    let median = 0;
    for(let index = 0; index < this.cards.length; index++){
      median += this.cards[index].porcentage;
    }
    median = median/this.cards.length;
    this.totalPorcentage = median.toPrecision(2);
    this.porcentageCircle = [median, 100];
  }

  openAddCardMenu(){
    this.addingNewCard = true;
  }

  closeAddCardMenu(){
    this.addingNewCard = false;
  }

  routeToReviseDeckPage(){
    if(this.currentDeck != undefined){
      this.currentDeck.addRevision();
    }
    this.routeService.navigate(["reviseDeck"])
  }

  deleteCard(cardToRemove : Card){
    this.currentDeck?.deleteCard(cardToRemove);
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
