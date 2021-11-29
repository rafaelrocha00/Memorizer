import { Card } from "./Card"

export class Deck{
    
    name : string = "";
    cards : Card[] = [];

    constructor(name : string){
        this.name = name;
    }

    public AddCard(newCard : Card){
        this.cards.push(newCard);
    }

    public GetCard(index : number){
        return this.cards[index];
    }

    public GetLenght(){
        return this.cards.length;
    }

    public GetAllCards() : Card[]{
        return this.cards;
    }
}