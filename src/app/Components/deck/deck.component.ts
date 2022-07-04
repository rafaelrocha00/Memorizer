import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BreakpointService } from 'src/app/Services/breakpoint.service';
import { Deck } from '../../DataClass/Deck';
import { CircleComponent } from '../circle/circle.component';

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
  perfomanceCircle : number[] = [0, 100]

  constructor(public breakpoint : BreakpointService) {}

  ngOnInit(): void {
    if(this.associatedDeck == undefined)return;

    this.numberOfCards = this.associatedDeck.getLenght();
    this.nameOfDeck = this.associatedDeck.name;
    this.perfomanceCircle = [this.associatedDeck.getMediumPerfomanceOnDeck(), 100]
  }


  public onClick(){
    this.ButtonWasClicked.emit(this.associatedDeck);
  }

}
