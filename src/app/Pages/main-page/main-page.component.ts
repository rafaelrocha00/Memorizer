import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Deck } from '../../DataClass/Deck';
import { DeckService } from 'src/app/Services/deck.service';
import { BreakpointService } from 'src/app/Services/breakpoint.service';
import { RequestService } from 'src/app/Services/request.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  decks : Deck[];
  showModal: boolean = false;

  constructor(private request: RequestService, public deckService: DeckService, private router: Router, public breakpoint : BreakpointService) {
    this.decks = [];
  }

  ngOnInit(): void {
   this.decks = this.deckService.getAllDecks();
  }

  public showModalAddNewDeck(){
    this.showModal = true
  }

  public closeModalAddNewDeck(){
    this.showModal = false
  }

  public async addNewDeck(name: string){
    let deck = new Deck(this.deckService.getNewDeckId(), name);
    await this.request.post('decks', deck)
    this.deckService.loaded = false
    this.closeModalAddNewDeck()
  }

  public selectDeck(deck: Deck){
    this.deckService.setCurrentDeck(deck);
    this.router.navigateByUrl('manageDeck/' + deck.id);
  }

}
