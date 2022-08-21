import { Component, OnInit } from '@angular/core';
import { RequestService } from '../Services/request.service';

@Component({
  selector: 'app-day-chart',
  templateUrl: './day-chart.component.html',
  styleUrls: ['./day-chart.component.css']
})
export class DayChartComponent implements OnInit {

  days: number[] = []

  constructor(private request: RequestService) { }

  ngOnInit(): void {
    this.getMonth()
  }

  async getMonth() {
   const currentDate = new Date()
   const month = parseInt(currentDate.getMonth().toString()) + 1
   const res : any = await this.request.get('revisions/month/total/' + month)
   this.days = res.data
  }

  getCurrentDayClass(day: number){
    let dayClass = 'day ' + (this.days[day] > 0 ? 'green-day' : '')
    const currentDay = new Date().getDate()
    console.log(currentDay, day)
    dayClass = currentDay == day + 1 ? 'day current-day': dayClass
    return dayClass
  }

}
