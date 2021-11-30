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
  inputIsUsingKatakana : boolean = false;

  constructor(private deckService : DeckService, private kanjiService : KanjiService, private routeService : Router) {
    this.currentDeck = this.deckService.GetCurrentDeck();
  }

  ngOnInit(): void {
    if(this.currentDeck.GetLenght() == 0) return;
    this.input = document.getElementById('wanakana-input') as HTMLInputElement;

    this.finalizouDeRevisar = false;
    this.MudarCartaPorIndex(0);
    if(this.input != null){
      if(this.kanjiService.isUsingKatakana()){
        wanakana.bind(this.input);
      }
      this.input.focus();
      this.kanjiService.onChange( this.lidarComBindDeInput.bind(this));
    }
  }

  MudarCarta(){
      this.inputDeTexto = "";
      this.cartaEstaVirada = false;
      this.idDeCartaAtual++;
      this.corBackCard = "#243955";

      if(this.idDeCartaAtual >= this.currentDeck.GetLenght()){
        this.finalizouDeRevisar = true;
        this.textoDaFrenteAtual = "Nenhuma carta nova!";
        return;
      }

      this.MudarCartaPorIndex(this.idDeCartaAtual);
      console.log("Carta mudou");
  }

  MudarCartaPorIndex(index : number){
    this.cartaAtual = this.currentDeck.GetCard(index);
    this.textoDaFrenteAtual = this.cartaAtual.frontText;
    this.textoDeTrazAtual = this.cartaAtual.backText;
  }

  VirarCarta(){
    this.cartaEstaVirada = true;
    this.inputDeTexto = this.textoDeTrazAtual;
    this.corBackCard = "#6B1E1E";
  }

  checkInput(){   
      let inputCorrigida : string = this.inputDeTexto.toLowerCase().trim();
      let inputrequerida : string = this.textoDeTrazAtual.toLowerCase().trim();
      console.log(inputrequerida);
      if(inputCorrigida == inputrequerida)
      {
        this.corBackCard = "#257419";
        this.cartaEstaVirada = true;
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

  Sair(){
    this.routeService.navigate([""]);
  }
}
