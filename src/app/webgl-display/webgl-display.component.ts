import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DCTService } from '../dct.service';

@Component({
  selector: 'app-webgl-display',
  templateUrl: './webgl-display.component.html',
  styleUrls: ['./webgl-display.component.scss']
})
export class WebglDisplayComponent {
  @ViewChild('canvasContainer', {static: true}) canvas!: ElementRef;
  @ViewChild('sourceIMG', {static: true}) img!: ElementRef;
  constructor(private dct: DCTService) { }

  ngAfterViewInit(): void {
    this.img.nativeElement.onload = () => {
      const performDCT = this.dct.getGraphicalDCT(false)
        .setOutput([this.img.nativeElement.width, this.img.nativeElement.height]).setPipeline(true)
      const decodeDCT = this.dct.getDecodeDCT(false)
        .setOutput([this.img.nativeElement.width, this.img.nativeElement.height]).setGraphical(true)
      let dct = performDCT(this.dct.quantTable, this.img.nativeElement)
      decodeDCT(this.dct.quantTable, dct)
      this.canvas.nativeElement.appendChild(decodeDCT.canvas)
    }
  }

}
