import { Component, OnInit } from '@angular/core';
import { EntradaDeTexto } from 'src/app/DataClass/EntradaDeTexto';
import { BreakpointService } from 'src/app/Services/breakpoint.service';
import { DeckService } from 'src/app/Services/deck.service';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-writing-page',
  templateUrl: './writing-page.component.html',
  styleUrls: ['./writing-page.component.css']
})
export class WritingPageComponent implements OnInit {

  textEntries : EntradaDeTexto[] = []
  current : number = 0

  constructor(private deckService : DeckService, private request: RequestService, public breakpoint: BreakpointService) { }

  ngOnInit(): void {
    this.getEntriesFromServer()
  }

  async getEntriesFromServer() {
    const res : any = await this.request.get('textEntries')
    res.data.forEach((entry: any) => entry.id = entry._id)
    this.textEntries = res.data
  }

  async createNewEntry(){
    const oldId = this.textEntries.length + 1
    const entradaObj: EntradaDeTexto = {text: '', name: 'Entrada ' + oldId, id: oldId}
    const entradaCriada: any = await (await this.request.post('textEntries', entradaObj))
    
    entradaObj.id = entradaCriada.data._id
    this.textEntries.push(entradaObj)
  }

  updateEntryInServer() {
    const current = this.textEntries[this.current]
    this.request.patch('textEntries/' + current.id, current)
  }

  selecionarEntradaDeTexto(index : number){
    this.current = index
  }

  checkInput() {

  }

  getEntryText() {
    if(!this.textEntries.length) { return ''}

    return this.textEntries[this.current].text
  }
}
