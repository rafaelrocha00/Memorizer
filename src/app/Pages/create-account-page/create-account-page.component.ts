import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.css']
})
export class CreateAccountPageComponent implements OnInit {

  nome: string = ''
  senha: string = ''
  senhaRepetida: string = ''
  show: boolean = true

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    const user = sessionStorage.getItem("user_key");
    this.show = !user
  }

  async createAccount() {
    const answer : any = await this.requestService.post('users/register', {name: this.nome, password: this.senha})
    console.log(answer)
    
    sessionStorage.setItem("user_key", answer.token);
    this.show = false
  }

}
