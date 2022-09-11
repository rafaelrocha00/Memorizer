import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { KanjiService } from '../Services/kanji.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  constructor(public kanjiService: KanjiService, private elementRef: ElementRef) { }
  @Output() close : EventEmitter<null> = new EventEmitter();

  ngOnInit(): void {
  }

  logOff() {
    sessionStorage.removeItem('user_key')
    localStorage.removeItem('user_key')
    window.location.reload()
  }

  toggleDarkMode() {
  }

  ToggleHiragana() {
    this.kanjiService.toggleKatakana()
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event : any): void {
     if (!this.elementRef.nativeElement.contains(event.target)) {
     this.close.emit()
     }
  }

}
