
export class Card{

     id : number = 0;

     frontText : string;
     backText : string;

     porcentage : number = 0;
     porcentageChange : number[] = [0, 30, 70, 100]
     correctAnswers : number = 0;

     revisions: number = 0
     successes: number = 0
     mistakes: number = 0

     daysUntilItsShowedAgain : number = 5;

    constructor(frontText : string, backText : string, _id: number | null = null){
        this.backText = backText;
        this.frontText = frontText;
        if(_id){
          this.id = _id
        }
     }

     public changeDaysUntilCanShowAgain(days: number){
          this.daysUntilItsShowedAgain = days;
     }

     public setId(id : number){
          if(this.id) { return }
          this.id = id;
     }

     public addHit(){
          if(this.correctAnswers + 1 >= this.porcentageChange.length){
               return;
          }

          this.correctAnswers++
          this.successes++
          this.revisions++
          this.updatePorcentage();
     }

     public addMistake(){
          this.correctAnswers = 0

          this.mistakes++
          this.revisions++
          
          this.updatePorcentage()
     }

     public updatePorcentage(){
          this.porcentage = this.porcentageChange[this.correctAnswers]
     }

     public saveCard(globalId : number){
          localStorage.setItem(globalId + this.id.toString() + "correctAnswers", this.correctAnswers.toString());
     }

     public loadCard(globalId : number){
          let correctAnswersSaved = localStorage.getItem(globalId + this.id.toString() + "correctAnswers");
          if(correctAnswersSaved != undefined){
               this.correctAnswers = +correctAnswersSaved;
               this.updatePorcentage();
               return;
          } 

     }

}