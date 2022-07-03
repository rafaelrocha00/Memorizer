import { Component, OnInit } from '@angular/core';
import { Sugestao } from 'src/app/DataClass/Sugestao';

@Component({
  selector: 'app-kanji-page',
  templateUrl: './kanji-page.component.html',
  styleUrls: ['./kanji-page.component.css']
})
export class KanjiPageComponent implements OnInit {

  sugestoes : Sugestao[] = [{nome: 'yoru'}, {nome: 'yoru'}, {nome: 'yoru'}, {nome: 'yoru'}]

  constructor() { }

  ngOnInit(): void {
  }

}
