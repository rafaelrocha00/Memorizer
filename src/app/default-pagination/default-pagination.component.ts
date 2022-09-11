import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from '../DataClass/pagination';

@Component({
  selector: 'app-default-pagination',
  templateUrl: './default-pagination.component.html',
  styleUrls: ['./default-pagination.component.css']
})
export class DefaultPaginationComponent implements OnInit {

  @Input() totalItens: number = 0
  itensPerPage: number = 25
  currentPage: number = 1
  @Output() pageChange: EventEmitter<Pagination> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  forwardPage() {
    this.currentPage = Math.min(this.currentPage + 1, this.totalItens / this.itensPerPage) 
    this.updatePage()
  }

  backPage() {
    this.currentPage = Math.max(this.currentPage - 1, 1) 
    this.updatePage()
  }

  changePage(newPage: number) {
    this.currentPage = newPage
    this.updatePage()
  }

  updatePage() {
    const startItens = (this.currentPage - 1) * this.itensPerPage
    const endItens = startItens + this.itensPerPage

    this.pageChange.emit({startItens, endItens})
  }

  getPaginationArray() {
    const arraySize = Math.floor(Math.max(this.totalItens/this.itensPerPage, 1)) 
    return [].constructor(arraySize)
  }
}
