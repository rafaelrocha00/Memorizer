import { Component, OnInit } from '@angular/core';
import { CardServiceService } from '../card-service.service';
import { Card } from '../DataClass/Card';


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

  cartasDisponiveis: Card[] = [];
  cartaAtual: Card | undefined
  idDeCartaAtual: number = 0

  constructor(private cardService : CardServiceService) {}

  ngOnInit(): void {
      this.cartasDisponiveis = this.cardService.GetCards();
      this.cartaAtual = this.cartasDisponiveis[0];
      this.textoDaFrenteAtual = this.cartaAtual.frontText;
      this.textoDeTrazAtual = this.cartaAtual.backText;

      this.finalizouDeRevisar = false;
  }

  MudarCarta(){
      this.cartaEstaVirada = false;
      this.idDeCartaAtual++;

      if(this.idDeCartaAtual >= this.cartasDisponiveis.length){
        this.FinalizarCartas();
        return;
      }

      this.cartaAtual = this.cartasDisponiveis[this.idDeCartaAtual];
      this.textoDaFrenteAtual = this.cartaAtual.frontText;
      this.textoDeTrazAtual = this.cartaAtual.backText;      
  }

  FinalizarCartas(){
    this.textoDaFrenteAtual = "Essas foram todas as cartas!";
    this.finalizouDeRevisar = true;
  }

  VirarCarta(){
    this.cartaEstaVirada = true;
  }

}
