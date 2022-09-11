import { Component, OnInit } from '@angular/core';
import { RequestService } from '../Services/request.service';
import { RevisionService } from '../Services/revision.service';

@Component({
  selector: 'app-day-chart',
  templateUrl: './day-chart.component.html',
  styleUrls: ['./day-chart.component.css']
})
export class DayChartComponent implements OnInit {

  days: number[] = []

  constructor(private request: RequestService, private revision: RevisionService) { }

  ngOnInit(): void {
    this.getMonth()
  }

  async getMonth() {
    this.days = await this.revision.getCurrentMonthRevisions()
  }

  getCurrentDayClass(day: number){
    let dayClass = 'day ' + (this.days[day] > 0 ? 'green-day' : '')
    const currentDay = new Date().getDate()
    dayClass = currentDay == day + 1 ? 'day current-day': dayClass
    return dayClass
  }

}
