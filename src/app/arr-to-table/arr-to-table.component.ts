import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-arr-to-table',
  templateUrl: './arr-to-table.component.html',
  styleUrls: ['./arr-to-table.component.scss']
})
export class ArrToTableComponent implements OnInit {
    @Input() array: number[][] = [[]];

  constructor() { }

  ngOnInit(): void {
  }

}
