import { Component, OnInit } from '@angular/core';
import { DeckService } from 'src/app/Services/deck.service';
import { KanjiService } from '../../Services/kanji.service';
import { DropdownOption } from 'src/app/DataClass/DropdownOption';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  kanjiReadings : DropdownOption[] = []
  constructor(public kanjiService : KanjiService, private deckService : DeckService, private router: Router) { }

  ngOnInit(): void {

  }


  searchCards(val : string) : void {
    this.kanjiReadings = [];
    const readings = this.deckService.getAllKanjisOfReading(val)
    // TODO: Forma melhor de procurar Kanjis e tela de Kanji individual
    readings.forEach((option) => {this.kanjiReadings.push({nome: option, onClick: () => { this.router.navigateByUrl('kanji/' + option);}})})
  }

}
