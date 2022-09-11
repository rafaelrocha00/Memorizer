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

  maxPaginationSize: number = 10

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

  getOneAbovePagination() {
    let diff = this.currentPage - this.maxPaginationSize
    diff = this.maxPaginationSize + Math.max(diff, 0)  
    return diff + 1
  }

  setOneAbovePagination() {
    const newPage = this.getOneAbovePagination()
    this.changePage(newPage)
    return this.currentPage
  }

  getPaginationArray() {
    const arraySize = Math.ceil(Math.max(this.totalItens/this.itensPerPage, 1)) 
    const arry = Array(arraySize).fill(1).map((_, i) => i + 1 + (Math.max(this.currentPage - this.maxPaginationSize, 0)))
    return arry
  }

  showAbovePagination() {
    const totalPages = this.totalItens / this.itensPerPage
    const insideMinBound = this.getPaginationArray().length >= this.maxPaginationSize
    const insideMaxBound = this.getOneAbovePagination() <= totalPages
    return insideMinBound && insideMaxBound
  }

  getTotalPages() {
    return Math.ceil(this.totalItens / this.itensPerPage)
  }
}
