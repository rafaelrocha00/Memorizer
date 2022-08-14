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
        throw answer
      }
      return answer

    } catch(err) {
      throw err
    }
  }

  public async get(url: string, headers: any = {}){
    url = this.serverURL + url 

    const token = sessionStorage.getItem('user_key')
    console.log(token)
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

    console.log(url)

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
      throw err
    }
  }

  public async delete(url: string, headers: any = {}){
    url = this.serverURL + url 

    const token = sessionStorage.getItem('user_key')

    const options : RequestInit = {
      method: 'DELETE',
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
      throw err
    }
  }

  public async patch(url: string, body: any, headers: any = {}){
    url = this.serverURL + url 

    const token = sessionStorage.getItem('user_key')

    const options : RequestInit = {
      method: 'PATCH',
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
      throw err
    }
  }

}
