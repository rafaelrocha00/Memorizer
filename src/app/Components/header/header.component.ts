import { Component, OnInit } from '@angular/core';
import { KanjiService } from '../../Services/kanji.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public kanjiService : KanjiService) { }

  ngOnInit(): void {
  }

}
