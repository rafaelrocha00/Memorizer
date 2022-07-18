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
  formCard: any;
  
  constructor(private request: RequestService, private formBuider: FormBuilder, private deckService : DeckService) { }

  ngOnInit(): void {
    this.formCard = this.formBuider.group({
      frontText: [''],
      backText: ['']
    });
  }

  addCard(){
    let currentDeck = this.deckService.getCurrentDeck();

    const frontText = this.formCard.controls['frontText'].value
    const backText = this.formCard.controls['backText'].value

    this.request.post('decks/addCard/' + currentDeck.id, {frontText: frontText, backText: backText})
    this.onClose.emit()
  }

}
