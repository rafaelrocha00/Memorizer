export class Card{

     frontText : string;
     backText : string;

     porcentage : number = 0;
     porcentageChange : number[] = [0, 30, 70, 100]
     correctAnswers : number = 0;

     dayItWasSeen : Date;
     daysUntilItsShowedAgain : number = 5;

    constructor(dayItWasSeen : Date, frontText : string, backText : string){
        this.dayItWasSeen = dayItWasSeen;
        this.backText = backText;
        this.frontText = frontText;
     }

     public changeDate(newDate: Date){
               this.dayItWasSeen = newDate;
     }

     public changeDaysUntilCanShowAgain(days: number){
          this.daysUntilItsShowedAgain = days;
     }

     public canShow(dayToShow : Date){
          const diffTime = Math.abs(dayToShow.valueOf() - this.dayItWasSeen.valueOf());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
          return diffDays >= this.daysUntilItsShowedAgain;
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