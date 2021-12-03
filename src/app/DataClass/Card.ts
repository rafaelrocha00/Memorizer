export class Card{

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

}