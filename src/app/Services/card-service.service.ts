import { Injectable } from '@angular/core';
import { Card } from '../DataClass/Card';

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {

  cartasDisponiveis: Card[] = [];
  diasParaAdicionarSeAcertarCarta = 5;

  constructor() { }

  public GetCards(){
    return this.cartasDisponiveis;
  }

  public AddNewCard(card: Card){
    this.cartasDisponiveis.push(card);
    console.log(card.frontText + " was added.");
  }

}
