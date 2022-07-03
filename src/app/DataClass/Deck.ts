import * as wanakana from "wanakana";
import { Card } from "./Card"

export class Deck{
    
    id : number = 0;
    name : string = "";
    cards : Card[] = [];
    numberOfRevisionsMade : number = 0;
    currentBiggestCardId : number = 0;

    constructor(id : number, name : string){
        this.name = name;
        this.id = id;
        this.loadDeck();
    }

    public addCard(newCard : Card){
        this.cards.push(newCard);
        newCard.setId(this.getNewCardId());
        newCard.loadCard(this.id);
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
        if(this.id == -1){
            console.error("this card is empty and cant be saved.");
            return;
        }
        localStorage.setItem(this.id.toString() + "_revisions", this.numberOfRevisionsMade.toString());
    }

    public saveDeck(){
        this.saveRevisions();
        for(let index = 0; index < this.cards.length; index++){
            this.cards[index].saveCard(this.id);
        }
    }

    public loadDeck(){
        let revisions = localStorage.getItem(this.id.toString() + "_revisions");
        if(revisions != undefined){
            this.numberOfRevisionsMade = +revisions;
        }
    }

    public getNewCardId(){
        this.currentBiggestCardId++;
        localStorage.setItem(this.id.toString() + "biggestCardId", this.currentBiggestCardId.toString());
        return this.currentBiggestCardId;
    }

    public getMediumPerfomanceOnDeck(){
        let median = 0;
        for(let index = 0; index < this.cards.length; index++){
        median += this.cards[index].porcentage;
        }
        median = median/this.cards.length;
        return median;
    }

    public getAllKanjisOfReading(reading : string) : string[]{
        let result : string[] = []

        for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i];

            const readingRomanji = wanakana.toRomaji(reading);
            const cardTomanji = wanakana.toRomaji(card.backText)

            if(cardTomanji.indexOf(readingRomanji) !== -1){
                result.push(card.frontText)
            }
        }

        return result
    }
}