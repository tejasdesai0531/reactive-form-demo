import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp-one',
  templateUrl: './comp-one.component.html',
  styleUrls: ['./comp-one.component.scss']
})
export class CompOneComponent implements OnInit {

  currentLayout = 'list' //grid or

  list = [
    { name: 'Box 1' },
    { name: 'Box 2' },
    { name: 'Box 3' },
    { name: 'Box 4' },
    { name: 'Box 5' },
    { name: 'Box 6' },
    { name: 'Box 7' },
    { name: 'Box 8' },
    { name: 'Box 9' },
    { name: 'Box 10' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  toggleLayout() {
    this.currentLayout = this.currentLayout === 'grid' ? 'list' : 'grid'
  }
}
