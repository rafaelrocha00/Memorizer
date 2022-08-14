import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { DropdownOption } from 'src/app/DataClass/DropdownOption';
import { KanjiService } from 'src/app/Services/kanji.service';
import * as wanakana from 'wanakana';

@Component({
  selector: 'app-b-input',
  templateUrl: './b-input.component.html',
  styleUrls: ['./b-input.component.css']
})
export class BInputComponent implements OnInit {

  inputElement : HTMLInputElement
  inputIsUsingKatakana : boolean = true;
  @Input() icon : string = ''
  @Input() bordas : boolean = false
  @Input() options : DropdownOption[] = []
  @Output() onChange : EventEmitter<string> = new EventEmitter();

  constructor(private kanjiService : KanjiService) { 
    this.inputElement = document.getElementById('db-input-field') as HTMLInputElement
  }

  ngOnInit(): void {
    if(!this.inputElement) {
      this.inputElement = document.getElementById('db-input-field') as HTMLInputElement
    }

    if(this.kanjiService.isUsingKatakana()){
      this.bindToJapanese()
    }

    this.inputElement.focus();
    this.kanjiService.onChange( this.bindInputToWanakana.bind(this));
    
  }

  onChangeEmit(event : any) {
    if(!event) { console.error('no value'); return}
    this.onChange.emit(event.target.value)
  }

  bindInputToWanakana(){
    if(this.kanjiService.isUsingKatakana() && !this.inputIsUsingKatakana){
      this.bindToJapanese()
    }

    if(!this.kanjiService.isUsingKatakana() && this.inputIsUsingKatakana){
      this.unbindToJapanese()
    }
  }

  bindToJapanese(){
    wanakana.bind(this.inputElement);
    this.inputIsUsingKatakana = true;
  }

  unbindToJapanese(){
    wanakana.unbind(this.inputElement);
    this.inputIsUsingKatakana = false;
    this.inputElement.value = wanakana.toRomaji(this.inputElement.value);
  }

  onClickOption(i : number){
    console.log('click')
    this.options[i].onClick()
  }

}
