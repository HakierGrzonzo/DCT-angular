import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GPU, Texture } from '../../gpu-browser.min';

interface QuantConstants {
  quants: number[][]
}


@Component({
  selector: 'app-webgl-display',
  templateUrl: './webgl-display.component.html',
  styleUrls: ['./webgl-display.component.scss']
})
export class WebglDisplayComponent {
  @ViewChild('canvasContainer', {static: true}) canvas!: ElementRef;
  @ViewChild('sourceIMG', {static: true}) img!: ElementRef;
  quantTable : number[][] = [
    [16, 11, 10, 16, 24, 40, 51, 61],
    [12, 12, 14, 19, 26, 58, 60, 55],
    [14, 13, 16, 24, 40, 57, 69, 56],
    [14, 17, 22, 29, 51, 87, 80, 62],
    [18, 22, 37, 56, 68, 109, 103, 77],
    [24, 35, 55, 64, 81, 104, 113, 92],
    [49, 64, 78, 87, 103, 121, 120, 101],
    [72, 92, 95, 98, 112, 100, 103, 99]
  ]

  constructor() { }

  ngAfterViewInit(): void {
    const gpu = new GPU();
    const size = 64
    this.img.nativeElement.onload = () => {
      const render = gpu.createKernel(function (image: any) {
        function alpha(u: any): any {
          if (u == 0) {
            return .7071
          } else {
            return 1
          }
        }
        const quants = [
          [16, 11, 10, 16, 24, 40, 51, 61],
          [12, 12, 14, 19, 26, 58, 60, 55],
          [14, 13, 16, 24, 40, 57, 69, 56],
          [14, 17, 22, 29, 51, 87, 80, 62],
          [18, 22, 37, 56, 68, 109, 103, 77],
          [24, 35, 55, 64, 81, 104, 113, 92],
          [49, 64, 78, 87, 103, 121, 120, 101],
          [72, 92, 95, 98, 112, 100, 103, 99]
        ]
        const u = this.thread.x % 8
        const v = this.thread.y % 8
        const base_x = this.thread.x - u
        const base_y = this.thread.y - v
        const post_dct = 1/4 * alpha(u) * alpha(v)
        let sum = 0
        for (let x = 0; x < 8; x++) {
          for (let y = 0; y < 8; y++) {
            const pixel = image[base_y + y][base_x + x];
            const color = ((pixel[0] + pixel[1] + pixel[2]) / 3 - .5) * 128;
            sum += color * Math.cos(((2 * x + 1) * u * 3.14) / 16) * Math.cos(((2 * y + 1) * v * 3.14) / 16)
          }
        }
        const res = Math.round(post_dct * sum / quants[u][v])
        this.color(res, res, res)
      }).setConstants({quants: this.quantTable})
        .setOutput([8 * size, 8 * size])
        .setGraphical(true)
      render(this.img.nativeElement)
      console.log(this.img)
      this.canvas.nativeElement.appendChild(render.canvas)
    }
    console.log(gpu);
  }

}
