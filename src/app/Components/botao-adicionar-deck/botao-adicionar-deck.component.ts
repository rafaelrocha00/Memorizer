import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-botao-adicionar-deck',
  templateUrl: './botao-adicionar-deck.component.html',
  styleUrls: ['./botao-adicionar-deck.component.css']
})
export class BotaoAdicionarDeckComponent implements OnInit {

  @Output() ButtonWasClicked = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
      this.ButtonWasClicked.emit();
  }
}
