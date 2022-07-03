import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Card } from '../../DataClass/Card';
import { DeckService } from 'src/app/Services/deck.service';


@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {

  formCard : FormGroup | any;
  backText: string = "";
  
  constructor(private formBuider: FormBuilder, private deckService : DeckService) { }

  ngOnInit(): void {
    this.formCard = this.formBuider.group({
      frontText: [''],
      backText: ['']
    });
  }

  onSubmit(){
    let currentDeck = this.deckService.getCurrentDeck();

    let card = new Card(this.formCard.controls['frontText'].value, this.formCard.controls['backText'].value);
    currentDeck.addCard(card);
    this.formCard.reset()
  }

}
