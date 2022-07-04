import { Component, HostListener, OnInit } from '@angular/core';
import { BreakpointService } from '../Services/breakpoint.service';

@Component({
  selector: 'app-breakpoint-component',
  templateUrl: './breakpoint-component.component.html',
  styleUrls: ['./breakpoint-component.component.css']
})
export class BreakpointComponentComponent implements OnInit {

  constructor(public breakpoint : BreakpointService) { 
  }


  ngOnInit(): void {
   this.updateBreakpoint();
  }

  updateBreakpoint(){
    this.breakpoint.updateBreakpoint();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event : any) {
    this.updateBreakpoint();
  }

}
