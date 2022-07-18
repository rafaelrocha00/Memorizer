import { Component, Input, OnInit } from '@angular/core';
import { Deck } from 'src/app/DataClass/Deck';

@Component({
  selector: 'app-modal-resultado-revisao',
  templateUrl: './modal-resultado-revisao.component.html',
  styleUrls: ['./modal-resultado-revisao.component.css']
})
export class ModalResultadoRevisaoComponent implements OnInit {

  @Input() show = true
  @Input() deck: Deck | null = null
  
  constructor() { }

  ngOnInit(): void {
  }

}
