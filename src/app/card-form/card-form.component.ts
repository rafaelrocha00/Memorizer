import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CardServiceService } from '../card-service.service';
import { Card } from '../DataClass/Card';


@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {

  formCard : FormGroup | any;
  backText: string = "";
  
  constructor(private formBuider: FormBuilder, private cardService : CardServiceService) { }

  ngOnInit(): void {
    this.formCard = this.formBuider.group({
      frontText: [''],
      backText: ['']
    });
  }

  onSubmit(){
    let card = new Card(new Date(), this.formCard.controls['frontText'].value, this.formCard.controls['backText'].value);
    this.cardService.AddNewCard(card);    
    this.formCard.reset()
  }

}
