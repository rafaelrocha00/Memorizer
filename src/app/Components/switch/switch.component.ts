import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {
  @Input() label : string =''
  @Input() state: boolean = false
  @Output() change : EventEmitter<null> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  click() {
    this.state = !this.state
    this.change.emit()
    console.log('click!')
  }
}
