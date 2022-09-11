import { Component, OnInit } from '@angular/core';
import { Sugestao } from 'src/app/DataClass/Sugestao';
import { ActivatedRoute } from '@angular/router';
import { BreakpointService } from 'src/app/Services/breakpoint.service';
import { Card } from 'src/app/DataClass/Card';
import { CardServiceService } from 'src/app/Services/card-service.service';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-kanji-page',
  templateUrl: './kanji-page.component.html',
  styleUrls: ['./kanji-page.component.css']
})
export class KanjiPageComponent implements OnInit {

  sugestoes : Sugestao[] = []
  kanji : Card | undefined
  constructor(private Activatedroute:ActivatedRoute, public breakpoint : BreakpointService, public request: RequestService, public cards : CardServiceService) { }

  ngOnInit(): void {
    this.Activatedroute.paramMap.subscribe(params => { 
      const id = params.get('id')
      // TODO: Voltar a tela principal quando não houver id
      if(!id) { return }
      this.setCard(id)
  });
  }

  async setCard(card: string){
    const res : any = await this.request.get('card/' + card)
    this.kanji = res.data[0]
  }

}
