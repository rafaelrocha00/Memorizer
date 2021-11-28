import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
   this.decks = this.deckService.GetAllDecks();
  }

  public addNewDeck(){
    this.decks.push(new Deck("Deck"));
  }

  public selectDeck(deck: Deck){
    this.deckService.SetCurrentDeck(deck);
    this.router.navigate(['reviseDeck']);
  }

}
