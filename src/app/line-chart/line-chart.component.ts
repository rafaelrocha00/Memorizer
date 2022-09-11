import { Component, OnInit } from '@angular/core';
import { RevisionService } from '../Services/revision.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  days: number[] = []
  points: any[] = []
  pointsFormatted: string = ''
  constructor(private revision: RevisionService) { }

  ngOnInit(): void {
    this.gerarGrafo()
  }

  async gerarGrafo() {
    this.days = await this.revision.getCurrentMonthRevisions()
    const largura = 500
    const altura = 200
    const maxHeight = Math.max(...this.days) || 1
    const contraste = 130 / maxHeight
    const paddingEsquerdo = 20
    this.days.forEach((day, i) => {
      const posLargura = paddingEsquerdo +  i * ( largura / this.days.length)
      const posAltura = Math.abs(altura - (day * contraste)) 
      this.points[i] = posLargura + ',' + posAltura
    })

    this.pointsFormatted = this.points.join(' ')
  }

}
