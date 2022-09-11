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
  @Input() deck: Deck = new Deck(-1, '')
  @Output() onClose : EventEmitter<null> = new EventEmitter();
  @Output() onConclude : EventEmitter<null> = new EventEmitter();
  @Output() onRetry : EventEmitter<null> = new EventEmitter();

  totalResult: number = 0

  constructor() { }

  ngOnInit(): void {
    if(this.deck.id === -1){
      console.error('no deck was assign to result modal!')
      return
    }
  }

  getLabel(percentage: number){
    if(percentage === 100) {return 'S'}
    if(percentage >= 80) {return 'A'}
    if(percentage >= 60) {return 'B'}
    if(percentage >= 30) {return 'C'}
    return 'F'
  }
}
