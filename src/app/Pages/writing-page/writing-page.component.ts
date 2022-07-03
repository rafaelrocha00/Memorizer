import { Component, OnInit } from '@angular/core';
import { EntradaDeTexto } from 'src/app/DataClass/EntradaDeTexto';
import { KanjiService } from 'src/app/Services/kanji.service';
import { Option } from 'src/app/DataClass/Option';
import * as wanakana from 'wanakana';
import { DeckService } from 'src/app/Services/deck.service';
@Component({
  selector: 'app-writing-page',
  templateUrl: './writing-page.component.html',
  styleUrls: ['./writing-page.component.css']
})
export class WritingPageComponent implements OnInit {

  EntradasDeTexto : EntradaDeTexto[] = []
  sugestoesDeKanji : String[] = []
  entradaDeTextoAtual : number = 0
  inputElement : HTMLTextAreaElement | undefined
  inputIsUsingKatakana : boolean = true
  searchingKanji : boolean = false
  sugestaoAtualDeKanji : number = 0
  options : Option[] = [
    {active: false, icon: 'fa fa-bold', onClick: this.boldText},
    {active: false, icon: 'fa fa-italic', onClick: this.boldText},
  ]


  constructor(private kanjiService : KanjiService, private deckService : DeckService) { }

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

  checkKanji(val : null | any) : boolean{
    console.log('checando kanji ' + val.target.value)

    if(val.key === 'Enter' && this.inputElement && this.searchingKanji){
      val.stopPropagation();
      val.preventDefault();
      this.inputElement.value = this.inputElement.value.split('ー')[0] + ' ' + this.sugestoesDeKanji[this.sugestaoAtualDeKanji]
      this.searchingKanji = false 
      this.sugestoesDeKanji = []
      return false;
    }

    if(this.searchingKanji && val.key !== 'Tab' && val.key !== 'Enter'){
      const words = val.target.value.split('ー')
      console.log(words[words.length - 1].replace('ー', ''))
      this.sugestoesDeKanji = this.deckService.getAllKanjisOfReading(words[words.length - 1].replace('ー', ''), 16)
    }

    if(val.key === 'Tab') {
      val.stopPropagation();
      val.preventDefault();
      this.sugestaoAtualDeKanji = this.sugestaoAtualDeKanji + 1;
      console.log(this.sugestaoAtualDeKanji)
      if(this.sugestaoAtualDeKanji === this.sugestoesDeKanji.length){
        this.sugestaoAtualDeKanji = 0;
      }
    }

    if(val.key === '-') {
      this.sugestoesDeKanji = []
      this.sugestaoAtualDeKanji = 0
      this.searchingKanji = true 
    }
    
    return true
  }

}
