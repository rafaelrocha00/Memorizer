import { Component, OnInit } from '@angular/core';
import { EntradaDeTexto } from 'src/app/DataClass/EntradaDeTexto';
import { KanjiService } from 'src/app/Services/kanji.service';
import { Option } from 'src/app/DataClass/Option';
import * as wanakana from 'wanakana';
@Component({
  selector: 'app-writing-page',
  templateUrl: './writing-page.component.html',
  styleUrls: ['./writing-page.component.css']
})
export class WritingPageComponent implements OnInit {

  EntradasDeTexto : EntradaDeTexto[] = []
  entradaDeTextoAtual : number = 0
  inputElement : HTMLTextAreaElement | undefined
  inputIsUsingKatakana : boolean = true;
  options : Option[] = [
    {active: false, icon: 'fa fa-bold', onClick: this.boldText},
    {active: false, icon: 'fa fa-italic', onClick: this.boldText},
  ]


  constructor(private kanjiService : KanjiService) { }

  ngOnInit(): void {
    this.inputElement = document.getElementById('wanakana-input') as HTMLTextAreaElement;
    
    if(this.inputElement != null){

      if(this.kanjiService.isUsingKatakana()){
        this.inputIsUsingKatakana = true;
        wanakana.bind(this.inputElement);
      }

      this.kanjiService.onChange( this.bindInputToWanakana.bind(this));
    }
  }

  
  bindInputToWanakana(){
    if(this.inputElement == undefined){
      this.inputElement = document.getElementById('wanakana-input') as HTMLTextAreaElement;
    }

    if(this.kanjiService.isUsingKatakana() && !this.inputIsUsingKatakana){
      wanakana.bind(this.inputElement);
      this.inputIsUsingKatakana = true;
    }

    if(!this.kanjiService.isUsingKatakana() && this.inputIsUsingKatakana){
      wanakana.unbind(this.inputElement);
      this.inputIsUsingKatakana = false;
      this.inputElement.value = wanakana.toRomaji(this.inputElement.value);
    }
  }

  boldText() {

  }

  italicText() {

  }

  createNewEntry(){
    const novaEntrada = {selected: false, id: EntradaDeTexto.length + 1, texto: ''}
    this.EntradasDeTexto.push(novaEntrada)
  }

  selecionarEntradaDeTexto(index : number){
    console.log('selecionando ' + index)
    if(!this.inputElement){
      console.error('input element not found');
      return;
    }

    this.EntradasDeTexto[this.entradaDeTextoAtual].texto =  this.inputElement.value
    this.EntradasDeTexto[this.entradaDeTextoAtual].selected = false
    this.EntradasDeTexto[index].selected = true

    this.entradaDeTextoAtual = index

    this.atualizarInputField()
  }

  atualizarInputField(){
    if(!this.inputElement) {console.error('input element not found'); return }
    this.inputElement.value = this.EntradasDeTexto[this.entradaDeTextoAtual].texto;
  }

}
