import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as wanakana from 'wanakana';
import { Card } from '../../DataClass/Card';
import { Deck } from '../../DataClass/Deck';
import { DeckService } from 'src/app/Services/deck.service';
import { CircleComponent } from 'src/app/Components/circle/circle.component';
import { BreakpointService } from 'src/app/Services/breakpoint.service';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-manage-deck-page',
  templateUrl: './manage-deck-page.component.html',
  styleUrls: ['./manage-deck-page.component.css']
})
export class ManageDeckPageComponent implements OnInit, OnDestroy {

  addingNewCard : boolean = false;
  currentDeck : Deck | undefined;
  currentDeckId : number = -1;
  cards : Card[] = [];
  filteredCards : Card[] = []
  currentElementInList : Card;
  searchBoxContainer : HTMLInputElement | undefined;
  subscription : Subscription | undefined;
  routeChange : Subscription | undefined;
  totalPorcentage : string = "0";
  porcentageCircle: number[] = [100, 100]

  constructor(private request: RequestService, private deckService : DeckService, public routeService : Router, private route: ActivatedRoute, public breakpoint : BreakpointService) { 
    this.currentElementInList = new Card("","");
  }

  ngOnInit(): void {
    this.routeChange = this.route.params.subscribe(params => {
      this.currentDeckId = params['id'];
      this.setDeck(this.currentDeckId);
    });
    this.searchBoxContainer = document.getElementById("searchBoxContainer") as HTMLInputElement;
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  async setDeck(id: number){
    console.log(id)
    const newDeck = await this.deckService.getDeckById(id);
    if(!newDeck) {
      console.error('deck ' + id + ' was not found on system');
      return;
    }

    this.currentDeck = newDeck;
    console.log(this.currentDeck.id)
    this.cards = this.currentDeck.getAllCards();
    this.filteredCards = this.cards;
    const performance = this.currentDeck.getMediumPerfomanceOnDeck();
    this.totalPorcentage = performance.toPrecision(2)
    this.porcentageCircle = [performance, 100];
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

  async deleteCard(cardToRemove : Card){
    this.currentDeck?.deleteCard(cardToRemove);
    await this.request.delete('decks/removeCard/' + this.currentDeck?.id + '/' + cardToRemove.id)

  }

  checkInput(){
    this.changeCardsToShowInList();
  }

  changeCardsToShowInList(): void {

    if(!this.searchBoxContainer) return;
    if(this.searchBoxContainer?.value == ""){
      this.filteredCards = this.cards;
    }

    this.filteredCards = [];
    for(let index = 0; index < this.cards.length; index++){

      let currentBackText = wanakana.toRomaji(this.cards[index].backText);
      let frontText = wanakana.toRomaji(this.cards[index].frontText);
      let inputString = wanakana.toRomaji(this.searchBoxContainer.value);
      if(currentBackText.includes(inputString) || frontText.includes(inputString)){
        this.filteredCards.push(this.cards[index]);
      }
    }

  } 
}
