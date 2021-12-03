import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../DataClass/Card';
import { Deck } from '../DataClass/Deck';
import { DeckService } from '../deck.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  decks : Deck[];
  constructor(private deckService: DeckService, private router: Router) {
    this.decks = [];
  }

  ngOnInit(): void {
   this.decks = this.deckService.getAllDecks();
  }

  public addNewDeck(){
    let deck = new Deck(this.deckService.getNewId(), "Deck");
    deck.addCard(new Card("日本語", "にほんご"));
    this.decks.push(deck);
  }

  public selectDeck(deck: Deck){
    this.deckService.setCurrentDeck(deck);
    this.router.navigate(['manageDeck']);
  }

}
