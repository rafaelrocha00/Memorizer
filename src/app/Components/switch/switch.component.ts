import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {
  @Input() label : string =''
  @Input() state: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
