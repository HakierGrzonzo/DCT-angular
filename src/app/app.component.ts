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
    images = [
        "assets/test.png",
        "assets/dragons.png",
        "assets/sus.png",
        "assets/polsl.png",
    ]
}
