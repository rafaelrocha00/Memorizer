import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {

  @Input() currentPorcentage : number[] = [0,0];
  @Input() label : String | undefined;
  @Input() absolute: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
