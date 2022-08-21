import { Component, OnInit, HostListener } from '@angular/core';
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
  remenberMe: boolean = false

  usernameIncorrect: boolean = false
  usernameErrorMessage: string = ''
  passwordIncorrect: boolean = false
  passwordErrorMessage: string = ''

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    const user = sessionStorage.getItem("user_key");
    this.show = !user
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key !== 'Enter') {return}
   
    this.createAccount()
  }

  focusUsername(){
    this.usernameIncorrect = false
  }

  focusPassword(){
    this.passwordIncorrect = false
  }

  validarEmail(){
    const emailValido = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(this.nome)
    if(!emailValido){
      this.usernameIncorrect = true
      this.usernameErrorMessage = 'Email invalido'
    }
  }

  isInvalidAccount() {
    if(!this.nome){
      this.usernameErrorMessage = 'Email é obrigatorio'
      this.usernameIncorrect = true
    }

    if(!this.senha || this.senha.length < 4){
      this.passwordErrorMessage = 'Precsa ter ao menos 4 letras'
      this.passwordIncorrect = true
    }

    return this.usernameIncorrect || this.passwordIncorrect
  }

  async createAccount() {

    if(this.isInvalidAccount()){
      return;
    }

    const answer : any = await this.requestService.post('users/register', {name: this.nome, password: this.senha})
    
    sessionStorage.setItem("user_key", answer.token);
    this.show = false
  }

}
