import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Deck } from '../DataClass/Deck';
import { DeckService } from '../deck.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  @Input() associatedDeck : Deck | undefined;
  @Output() ButtonWasClicked : EventEmitter<Deck> = new EventEmitter();

  numberOfCards : number = 0;
  nameOfDeck : string = "";


  ngOnInit(): void {
    if(this.associatedDeck == undefined)return;

    this.numberOfCards = this.associatedDeck.GetLenght();
    this.nameOfDeck = this.associatedDeck.name;
  }


  public onClick(){
    this.ButtonWasClicked.emit(this.associatedDeck);
  }

}
