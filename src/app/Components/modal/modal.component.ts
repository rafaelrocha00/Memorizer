import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() show = true
  @Input() title = ''
  @Output() onClose : EventEmitter<ModalComponent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public closeModal(){
    this.onClose.emit(this)
  }

}
