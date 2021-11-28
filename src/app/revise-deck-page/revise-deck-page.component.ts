import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Card } from '../DataClass/Card';
import { Deck } from '../DataClass/Deck';
import { DeckService } from '../deck.service';


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

  constructor(private deckService : DeckService, private routeService : Router) {
    this.currentDeck = this.deckService.GetCurrentDeck();
  }

  ngOnInit(): void {
    if(this.currentDeck.GetLenght() == 0) return;

    this.finalizouDeRevisar = false;
    this.MudarCartaPorIndex(0);
    let textInput = document.getElementById('backCardInput');
    if(textInput != null) textInput.focus();
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

  Sair(){
    this.routeService.navigate([""]);
  }
}
