import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class RevisionService {

  currentMonthRevisions: number[] = []
  totalRevisions: number = 0
  cardsToRevise: number = 0
  cardsToLearn: number = 0

  constructor(private request: RequestService) { }

  async getCurrentMonthRevisions() {
    if(this.currentMonthRevisions.length) { return this.currentMonthRevisions}

    const currentDate = new Date()
   const month = parseInt(currentDate.getMonth().toString()) + 1
   const res : any = await this.request.get('revisions/month/total/' + month)
   this.currentMonthRevisions = res.data

    return this.currentMonthRevisions
  }
}
