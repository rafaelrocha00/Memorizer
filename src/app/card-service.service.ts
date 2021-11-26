import { Injectable } from '@angular/core';
import { Card } from './DataClass/Card';

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {

  cartasDisponiveis: Card[] = [];
  diasParaAdicionarSeAcertarCarta = 5;

  constructor() { }

  CreateCards(){
    let carta1 = new Card(new Date(), "Kokoro", "Coracao");
    let carta2 = new Card(new Date(), "Ai", "Amor");
    let carta3 = new Card(new Date(), "Zetsubo", "Desespero");
    this.cartasDisponiveis = [carta1, carta2, carta3];
  }

  public GetCards(){
    if(this.cartasDisponiveis.length == 0){
      this.CreateCards();
    }

    return this.cartasDisponiveis;
  }

  public AddNewCard(card: Card){
    if(this.cartasDisponiveis.length == 0){
      this.CreateCards();
    }
    card.ChangeDaysUntilCanShowAgain(this.diasParaAdicionarSeAcertarCarta);
    this.cartasDisponiveis.push(card);
  }

}
