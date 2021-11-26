export class Card{

     dayItWasSeen : Date;
     frontText : string;
     backText : string;
     daysUntilItsShowedAgain : number = 5;

    constructor(dayItWasSeen : Date, frontText : string, backText : string){
        this.dayItWasSeen = dayItWasSeen;
        this.backText = backText;
        this.frontText = frontText;
     }

     public ChangeDate(newDate: Date){
               this.dayItWasSeen = newDate;
     }

     public ChangeDaysUntilCanShowAgain(days: number){
          this.daysUntilItsShowedAgain = days;
     }

     public CanShow(dayToShow : Date){

          const diffTime = Math.abs(dayToShow.valueOf() - this.dayItWasSeen.valueOf());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
          return diffDays >= this.daysUntilItsShowedAgain;
     }
}