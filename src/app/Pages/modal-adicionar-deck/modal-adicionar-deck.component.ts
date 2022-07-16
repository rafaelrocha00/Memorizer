import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-adicionar-deck',
  templateUrl: './modal-adicionar-deck.component.html',
  styleUrls: ['./modal-adicionar-deck.component.css']
})
export class ModalAdicionarDeckComponent implements OnInit {

  @Input() show: boolean = false
  @Output() onNewDeck : EventEmitter<string> = new EventEmitter();
  @Output() onClose : EventEmitter<null> = new EventEmitter();
  deckName: string = ''

  constructor() { }
  ngOnInit(): void {
  }

  addNewDeck(){
    console.log('adding new Deck')
    this.onNewDeck.emit(this.deckName)
  }

}
