import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  public mobileBreakpoint : boolean = false;
  private mobileWidth: number = 670

  updateBreakpoint() {
    const windowSize = window.innerWidth != null && window.innerWidth <= this.mobileWidth;
    const ElementSize = document.documentElement.clientWidth != null && document.documentElement.clientWidth <= this.mobileWidth;

    this.mobileBreakpoint = windowSize || ElementSize;
  }
}
