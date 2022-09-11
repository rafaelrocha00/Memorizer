import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {

  @Input() currentPorcentage : number[] = [0,0];
  @Input() oldPorcentage : number[] = [];
  @Input() label : String | undefined;
  @Input() absolute: boolean = true;
  @Input() small: boolean = false;
  @Input() scale: number = 1;
  @Input() dashSize: number = 2.2;
  @Input() fontSize: number = 3;

  constructor() { }

  ngOnInit(): void {
  }

}
