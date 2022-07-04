import { Component, OnInit } from '@angular/core';
import { Sugestao } from 'src/app/DataClass/Sugestao';
import { ActivatedRoute } from '@angular/router';
import { BreakpointService } from 'src/app/Services/breakpoint.service';

@Component({
  selector: 'app-kanji-page',
  templateUrl: './kanji-page.component.html',
  styleUrls: ['./kanji-page.component.css']
})
export class KanjiPageComponent implements OnInit {

  sugestoes : Sugestao[] = []
  kanji : string | null = ''
  constructor(private Activatedroute:ActivatedRoute, public breakpoint : BreakpointService) { }

  ngOnInit(): void {
    this.Activatedroute.paramMap.subscribe(params => { 
      this.kanji = params.get('id'); 
});
  }

}
