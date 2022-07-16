import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  nome: string = ''
  senha: string = ''
  show: boolean = true

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
  }

  async entrar(){
    const answer: any = await this.requestService.post('users/login', {name: this.nome, password: this.senha})
    sessionStorage.setItem("user_key", answer.token);
    sessionStorage.setItem("user_id", answer.userId);

    this.show = false

  } 

}
