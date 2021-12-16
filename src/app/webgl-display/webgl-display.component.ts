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
  gpu = new GPU()
  quantTable : number[][] = [
    [16, 11, 10, 16, 24,  40,   51,   61],
    [12, 12, 14, 19, 26,  58,   60,   55],
    [14, 13, 16, 24, 40,  57,   69,   56],
    [14, 17, 22, 29, 51,  87,   80,   62],
    [18, 22, 37, 56, 68,  109,  103,  77],
    [24, 35, 55, 64, 81,  104,  113,  92],
    [49, 64, 78, 87, 103, 121,  120,  101],
    [72, 92, 95, 98, 112, 100,  103,  99]
  ]

  constructor() { }

  ngAfterViewInit(): void {
    const blocksize = 8
    const size = 64
    this.img.nativeElement.onload = () => {
      const performDCT = this.gpu.createKernel(function (blocksize: any, quants: any, image: any) {
        function alpha(z: any): any {
          if (z == 0) {
            return 1 / Math.sqrt(2)
          } else {
            return 1
          }
        }
        const u = this.thread.x % blocksize
        const v = this.thread.y % blocksize
        const base_x = this.thread.x - u
        const base_y = this.thread.y - v
        const post_dct = 1/(blocksize / 2) * alpha(u) * alpha(v)
        let sum = 0
        for (let x = 0; x < blocksize; x++) {
          for (let y = 0; y < blocksize; y++) {
            const pixel = image[base_y + y][base_x + x];
            const color = ((pixel[0] + pixel[1] + pixel[2]) / 3) * 256;
            sum += post_dct * color * Math.cos(((2 * x + 1) * u * 3.14) / (2 * blocksize)) * Math.cos(((2 * y + 1) * v * 3.14) / (2 * blocksize))  / quants[v][u]
          }
        }
        const res = Math.round(sum)
        return res
      }).setOutput([8 * size, 8 * size])

      const decodeDCT = this.gpu.createKernel(function (blocksize: any, quants: any, data: any) {
        function alpha(z: any): any {
          if (z == 0) {
            return 1 / Math.sqrt(2)
          } else {
            return 1
          }
        }
        const base_x = this.thread.x - this.thread.x % blocksize
        const base_y = this.thread.y - this.thread.y % blocksize
        let sum = 0
        for (let u = 0; u < blocksize; u++) {
          for (let v = 0; v < blocksize; v++) {
            const post_dct = alpha(u) * alpha(v) * (data[base_y + u][base_x + v] / 256) * quants[v][u];
            sum += post_dct * Math.cos(((2 * (this.thread.x % blocksize) + 1) * v * 3.14) / (2 * blocksize)) * Math.cos(((2 * (this.thread.y % blocksize) + 1) * u * 3.14) / (2 * blocksize)) / (blocksize / 2)
          }
        }
        //const res = data[this.thread.y][this.thread.x] / 128 * quants[this.thread.y % 8][this.thread.x % 8] + .5
        this.color(sum, sum, sum)
      }).setOutput([8 * size, 8 * size])
        .setGraphical(true)

      let dct = performDCT(blocksize, this.quantTable, this.img.nativeElement)
      console.log(dct)
      decodeDCT(blocksize, this.quantTable, dct)
      this.canvas.nativeElement.appendChild(decodeDCT.canvas)
    }
  }

}
