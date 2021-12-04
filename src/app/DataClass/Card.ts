
export class Card{

     id : number = 0;
     frontText : string;
     backText : string;

     porcentage : number = 0;
     porcentageChange : number[] = [0, 30, 70, 100]
     correctAnswers : number = 0;

     daysUntilItsShowedAgain : number = 5;

    constructor(frontText : string, backText : string){
        this.backText = backText;
        this.frontText = frontText;
     }

     public changeDaysUntilCanShowAgain(days: number){
          this.daysUntilItsShowedAgain = days;
     }

     public setId(id : number){
          this.id = id;
     }

     public addHit(){
          if(this.correctAnswers + 1 >= this.porcentageChange.length){
               return;
          }

          this.correctAnswers++;
          this.updatePorcentage();
     }

     public addMistake(){
          this.correctAnswers = 0;
          this.updatePorcentage();
     }

     public updatePorcentage(){
          this.porcentage = this.porcentageChange[this.correctAnswers]
     }

     public saveCard(globalId : number){
          sessionStorage.setItem(globalId + this.id.toString() + "correctAnswers", this.correctAnswers.toString());
          console.log("Saving: deckId: " + globalId + " id " + this.id + " " + this.frontText);
     }

     public loadCard(globalId : number){
          let correctAnswersSaved = sessionStorage.getItem(globalId + this.id.toString() + "correctAnswers");
          console.log("loading: deckId: " + globalId + " id " + this.id + " " + this.frontText);
          if(correctAnswersSaved != undefined){
               this.correctAnswers = +correctAnswersSaved;
               this.updatePorcentage();
               console.log("loading sucessifull");
          }    
     }

}