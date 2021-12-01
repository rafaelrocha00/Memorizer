import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Card } from '../DataClass/Card';
import { Deck } from '../DataClass/Deck';
import { DeckService } from '../deck.service';
import * as wanakana from 'wanakana';
import { KanjiService } from '../kanji.service';


@Component({
  selector: 'app-revise-deck-page',
  templateUrl: './revise-deck-page.component.html',
  styleUrls: ['./revise-deck-page.component.css']
})
export class ReviseDeckPageComponent implements OnInit {

  cartaEstaVirada: boolean = false
  finalizouDeRevisar: boolean = false
  textoDaFrenteAtual: string = "";
  textoDeTrazAtual: string = "";
  corBackCard : string = "#243955";
  inputDeTexto : string = "";

  currentDeck : Deck;
  cartaAtual: Card | undefined;
  idDeCartaAtual: number = 0

  input : HTMLInputElement | undefined
  inputIsUsingKatakana : boolean = true;

  constructor(private deckService : DeckService, private kanjiService : KanjiService, private routeService : Router) {
    this.currentDeck = this.deckService.GetCurrentDeck();
  }

  ngOnInit(): void {
    if(this.currentDeck.GetLenght() == 0) return;
    this.input = document.getElementById('wanakana-input') as HTMLInputElement;

    this.finalizouDeRevisar = false;
    this.mudarCartaPorIndex(0);
    if(this.input != null){
      if(this.kanjiService.isUsingKatakana()){
        wanakana.bind(this.input);
      }
      this.input.focus();
      this.kanjiService.onChange( this.lidarComBindDeInput.bind(this));
    }
  }

  mudarCarta(){
      this.inputDeTexto = "";
      this.cartaEstaVirada = false;
      this.idDeCartaAtual++;
      this.corBackCard = "#243955";

      if(this.idDeCartaAtual >= this.currentDeck.GetLenght()){
        this.finalizouDeRevisar = true;
        this.textoDaFrenteAtual = "Nenhuma carta nova!";
        return;
      }

      this.mudarCartaPorIndex(this.idDeCartaAtual);
      console.log("Carta mudou");
  }

  mudarCartaPorIndex(index : number){
    this.cartaAtual = this.currentDeck.GetCard(index);
    this.textoDaFrenteAtual = this.cartaAtual.frontText;
    this.textoDeTrazAtual = this.cartaAtual.backText;
  }

  virarCarta(){
    if(this.cartaEstaVirada){
      this.mudarCarta();
      return;
    }

    this.cartaEstaVirada = true;
    this.inputDeTexto = this.textoDeTrazAtual;
    this.corBackCard = "#6B1E1E";
  }

  checkInput(){   
      let inputCorrigida : string = this.inputDeTexto.toLowerCase().trim();
      inputCorrigida = wanakana.toRomaji(inputCorrigida);
      let inputRequerida : string = this.textoDeTrazAtual.toLowerCase().trim();
      inputRequerida = wanakana.toRomaji(inputRequerida);
      let inputrequeridaDividida : string[] = inputRequerida.split(',');
      console.log(inputRequerida);
      for(let index = 0; index < inputrequeridaDividida.length; index++){
        if(inputCorrigida == inputrequeridaDividida[index])
        {
          this.corBackCard = "#257419";
          this.cartaEstaVirada = true;
          break;
        }
      }
     
  }


  lidarComBindDeInput(){
    if(this.input == undefined){
      this.input = document.getElementById('wanakana-input') as HTMLInputElement;
    }

    if(this.kanjiService.isUsingKatakana() && !this.inputIsUsingKatakana){
      wanakana.bind(this.input );
      this.inputIsUsingKatakana = true;
    }

    if(!this.kanjiService.isUsingKatakana() && this.inputIsUsingKatakana){
      wanakana.unbind(this.input);
      this.inputIsUsingKatakana = false;
      this.input.value = wanakana.toRomaji(this.input.value);
    }
  }

  sair(){
    this.routeService.navigate([""]);
  }
}
