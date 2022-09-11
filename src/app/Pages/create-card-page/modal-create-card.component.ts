import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DeckService } from 'src/app/Services/deck.service';
import { RequestService } from 'src/app/Services/request.service';


@Component({
  selector: 'app-modal-create-card',
  templateUrl: './modal-create-card.component.html',
  styleUrls: ['./modal-create-card.component.css']
})
export class ModalCreateCardComponent implements OnInit {

  @Input() show: boolean = false
  @Output() onClose : EventEmitter<null> = new EventEmitter();
  frontText: string = ''
  backText: string = ''
  meaning: string = ''
  
  constructor(private request: RequestService, private deckService : DeckService) { }

  ngOnInit(): void {
  }

  addCard(){
    let currentDeck = this.deckService.getCurrentDeck();

    this.request.post('decks/addCard/' + currentDeck.id, {frontText: this.frontText, backText: this.backText})
    this.onClose.emit()
  }

}
