import { Card } from "./Card"

export class Deck{
    
    id : number = 0;
    name : string = "";
    cards : Card[] = [];
    numberOfRevisionsMade : number = 0;

    constructor(id : number, name : string){
        this.name = name;
        this.id = id;
        this.loadDeck();
    }

    public addCard(newCard : Card){
        this.cards.push(newCard);
    }

    public getCard(index : number){
        return this.cards[index];
    }

    public getLenght(){
        return this.cards.length;
    }

    public getAllCards() : Card[]{
        console.log(this.name);
        return this.cards;
    }

    public deleteCard(cardToDelete : Card){
        this.cards.splice(this.cards.indexOf(cardToDelete), 1);
    }

    public addRevision(){
        this.numberOfRevisionsMade++;
        this.saveRevisions();
    }

    public saveRevisions(){
        localStorage.setItem(this.id.toString() + "_revisions", this.numberOfRevisionsMade.toString());
    }

    public loadDeck(){
        let revisions = localStorage.getItem(this.id.toString() + "_revisions");
        if(revisions != undefined){
            this.numberOfRevisionsMade = +revisions;
        }
    }
}