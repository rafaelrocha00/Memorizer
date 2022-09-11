import { Component, OnInit, HostListener } from '@angular/core';
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
  remenberMe: boolean = false

  usernameIncorrect: boolean = false
  usernameErrorMessage: string = ''
  passwordIncorrect: boolean = false
  passwordErrorMessage: string = ''

  constructor(private requestService: RequestService, private router: Router) { }

  ngOnInit(): void {
    console.log('login page')
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key !== 'Enter') {return}
   
    this.entrar()
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

  contaInvalida() {
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

  showMensagemDeErro(erro: any) {
    if(erro.status === 404){
      this.usernameErrorMessage = 'Usuario não encontrado'
      this.usernameIncorrect = true
    }

    if(erro.status === 400){
      this.passwordErrorMessage = 'Senha incorreta'
      this.passwordIncorrect = true
    }
  }

  setarToken(token: any){
    if(this.remenberMe)
    {
      localStorage.setItem("user_key", token)
      return
    }

    sessionStorage.setItem("user_key", token);
  }

  async entrar(){
   

    if(this.contaInvalida()){
      return;
    }

    const answer: any = await this.requestService.post('users/login', {name: this.nome, password: this.senha}).catch(this.showMensagemDeErro)

    if(!answer) { return}
    
    this.setarToken(answer.token)
    this.router.navigate([''])
  } 

}
