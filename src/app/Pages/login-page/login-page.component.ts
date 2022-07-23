import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  nome: string = ''
  senha: string = ''

  usernameIncorrect: boolean = false
  passwordIncorrect: boolean = false

  constructor(private requestService: RequestService, private router: Router) { }

  ngOnInit(): void {
    console.log('login page')
  }

  focusUsername(){
    this.usernameIncorrect = false
  }

  focusPassword(){
    this.passwordIncorrect = false
  }

  async entrar(){
    const answer: any = await this.requestService.post('users/login', {name: this.nome, password: this.senha}).catch(err => {
      console.log(err)
      if(err.status === 404){
        console.log('not found')
        this.usernameIncorrect = true
      }

      if(err.status === 400){
        this.passwordIncorrect = true
      }
      console.log(err)
      return
    })
    if(!answer) { return}

    sessionStorage.setItem("user_key", answer.token);
    this.router.navigate([''])
  } 

}
