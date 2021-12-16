import { Component } from '@angular/core';
import { Vals } from './vals';
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
}
