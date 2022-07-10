import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() show = true
  @Output() onExit : EventEmitter<ModalComponent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.onExit.emit(this)
  }

}
