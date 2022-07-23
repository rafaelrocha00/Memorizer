import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/DataClass/Card';
import { Deck } from 'src/app/DataClass/Deck';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-resultado-revisao',
  templateUrl: './modal-resultado-revisao.component.html',
  styleUrls: ['./modal-resultado-revisao.component.css']
})
export class ModalResultadoRevisaoComponent implements OnInit {

  @Input() show = true
  @Input() deck: Deck | undefined
  @Output() onClose : EventEmitter<null> = new EventEmitter();
  @Output() onConclude : EventEmitter<null> = new EventEmitter();
  @Output() onRetry : EventEmitter<null> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    if(!this.deck){
      console.log('no deck')
      return
    }
    console.log(this.deck.cards)
  }
}
