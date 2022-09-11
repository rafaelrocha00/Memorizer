import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Option } from 'src/app/DataClass/Option';
import * as wanakana from 'wanakana';

import { KanjiService } from 'src/app/Services/kanji.service';
import { DeckService } from '../Services/deck.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  inputElement : HTMLTextAreaElement
  inputIsUsingKatakana : boolean = true
  

  searchingKanji : boolean = false
  sugestaoAtualDeKanji : number = 0

  sugestoesDeKanji : String[] = []

  @Input() text: string = ''
  @Output() blur : EventEmitter<null> = new EventEmitter();
  @Output() keyDown : EventEmitter<KeyboardEvent> = new EventEmitter();


  options : Option[] = [
    {active: false, icon: 'fa fa-bold', onClick: this.boldText},
    {active: false, icon: 'fa fa-italic', onClick: this.italicText},
  ]

  constructor(private kanji: KanjiService, private deck: DeckService) { 
    this.inputElement = document.getElementById('wanakana-input') as HTMLTextAreaElement;
  }

  boldText() {

  }

  italicText() {

  }

  ngOnInit(): void {
    this.inputElement = document.getElementById('wanakana-input') as HTMLTextAreaElement;
    
    if(this.inputElement != null){

      if(this.kanji.isUsingKatakana()){
        this.inputIsUsingKatakana = true;
        wanakana.bind(this.inputElement);
      }

      this.kanji.onChange( this.bindInputToWanakana.bind(this));
    }
  }

  bindInputToWanakana(){
    if(this.inputElement == undefined){
      this.inputElement = document.getElementById('wanakana-input') as HTMLTextAreaElement;
    }

    if(this.kanji.isUsingKatakana() && !this.inputIsUsingKatakana){
      wanakana.bind(this.inputElement);
      this.inputIsUsingKatakana = true;
    }

    if(!this.kanji.isUsingKatakana() && this.inputIsUsingKatakana){
      wanakana.unbind(this.inputElement);
      this.inputIsUsingKatakana = false;
      this.inputElement.value = wanakana.toRomaji(this.inputElement.value);
    }
  }

  checkforKanji(val: KeyboardEvent) : boolean {
    this.keyDown.emit(val)

    const target = val.target as HTMLTextAreaElement

    if(val.key === 'Enter' && this.searchingKanji){
      val.stopPropagation()
      val.preventDefault()
     
      this.inputKanji()
      return false
    }

    if(this.searchingKanji && val.key !== 'Tab' && val.key !== 'Enter'){
      const text = target.value.split('ー')

      if(text.length > 2) {
        this.searchingKanji = false
        return false
      }

      const kanji = text[text.length - 1].replace('ー', '')

      this.sugestoesDeKanji = this.deck.getAllKanjisOfReading(kanji)
    }

    if(val.key === 'Tab') {
      val.stopPropagation();
      val.preventDefault();

      if(this.sugestoesDeKanji.length === 1) { 
        this.inputKanji();
        return false;
      }

      this.sugestaoAtualDeKanji = this.sugestaoAtualDeKanji + 1;

      if(this.sugestaoAtualDeKanji === this.sugestoesDeKanji.length){
        this.sugestaoAtualDeKanji = 0;
      }

      return false;
    }

    if(val.key === '-') {
      this.sugestoesDeKanji = []
      this.sugestaoAtualDeKanji = 0
      this.searchingKanji = true 
    }
    
    return true
  }

  inputKanji(){

    const text = this.inputElement.value.split('ー')[0]
    const kanji = this.sugestoesDeKanji[this.sugestaoAtualDeKanji] || ''
    this.inputElement.value = text + ' ' + kanji
    
    this.reset()
  }

  reset(){
    this.searchingKanji = false 
    this.sugestoesDeKanji = []
  }

}
