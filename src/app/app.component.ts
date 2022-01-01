import { Component } from '@angular/core';
import { KatexOptions } from 'ng-katex';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DCT-angular';
  vals =[
      [255, 0, 255, 0, 255, 0, 255, 0],
      [255, 0, 255, 0, 255, 0, 255, 0],
      [255, 0, 255, 0, 255, 0, 255, 0],
      [255, 0, 255, 0, 255, 0, 255, 0],
      [255, 0, 255, 0, 255, 0, 255, 0],
      [255, 0, 255, 0, 255, 0, 255, 0],
      [255, 0, 255, 0, 255, 0, 255, 0],
      [255, 0, 255, 0, 255, 0, 255, 0],
    ]
    displayKatex : KatexOptions = {
        displayMode: true
    }
}
