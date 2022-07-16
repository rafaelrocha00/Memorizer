import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  serverURL : string = 'http://localhost:3000/'
  constructor() { }

  public async post(url: string, body: any, headers: any = {}){
    url = this.serverURL + url 

    const token = sessionStorage.getItem('user_key')

    const options : RequestInit = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token || ''
      },
      body: JSON.stringify(body) || '',
      mode: 'cors',
      cache: 'default'
    }

    try{
      let answer = await fetch(url, options)
      answer = await answer.json();
      if(!answer.ok){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        throw answer.message
      }
      return answer

    } catch(err) {
      console.log(err)
      return err
    }
  }

  public async get(url: string, headers: any = {}){
    url = this.serverURL + url 

    const token = sessionStorage.getItem('user_key')

    const options : RequestInit = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token || ''
      },
      mode: 'cors',
      cache: 'default'
    }

    try{
      let answer = await fetch(url, options)
      answer = await answer.json();
      if(!answer.ok){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        throw answer.message
      }
      return answer

    } catch(err) {
      console.log(err)
      return err
    }
  }

}
