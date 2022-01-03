import { Component, OnInit } from '@angular/core';
import { KatexOptions } from 'ng-katex';

@Component({
  selector: 'app-jpeg',
  templateUrl: './jpeg.component.html',
  styleUrls: ['./jpeg.component.scss']
})
export class JpegComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    displayKatex : KatexOptions = {
        displayMode: true
    }
}
