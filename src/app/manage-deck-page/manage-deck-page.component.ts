import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  currentElementInList : Card;

  constructor(private deckService : DeckService, private routeService : Router) { 
    this.currentElementInList = new Card(new Date(),"","");
  }

  ngOnInit(): void {
    this.currentDeck = this.deckService.GetCurrentDeck();
    this.cards = this.currentDeck.GetAllCards();
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
}
