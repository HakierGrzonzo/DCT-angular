import { Injectable } from '@angular/core';
import { GPU } from '../../gpu-browser.min';

@Injectable({
    providedIn: 'root'
})
export class DCTService {
    constructor() { }
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
    gpu = new GPU()
    cpu = new GPU({mode: 'cpu'})

    getDCTkernel(cpu = false) {
        return (cpu? this.gpu : this.cpu ).createKernel(function (source: any) {
            function alpha(z: any): any {
              if (z == 0) {
                return 1 / Math.sqrt(2)
              } else {
                return 1
              }
            }
            const u = this.thread.x % 8
            const v = this.thread.y % 8
            const base_x = this.thread.x - u
            const base_y = this.thread.y - v
            const post_dct = 1/4 * alpha(u) * alpha(v)
            let sum = 0
            for (let x = 0; x < 8; x++) {
              for (let y = 0; y < 8; y++) {
                const color = source[base_y + y][base_x + x];
                sum += color * Math.cos(((2 * x + 1) * u * 3.14) / 16) * Math.cos(((2 * y + 1) * v * 3.14) / 16)
              }
            }
            const res = Math.round(sum * post_dct)
            return res
        }).setPrecision('single').setTactic('precision')
    }

    getGraphicalDCT(cpu = false) {
        return (cpu? this.cpu : this.cpu ).createKernel(function (quants: any, image: any) {
            function alpha(z: any): any {
                if (z == 0) {
                    return 1 / Math.sqrt(2)
                } else {
                    return 1
                }
            }
            const u = this.thread.x % 8
            const v = this.thread.y % 8
            const base_x = this.thread.x - u
            const base_y = this.thread.y - v
            const post_dct = 1/(8 / 2) * alpha(u) * alpha(v)
            let sum = 0
            for (let x = 0; x < 8; x++) {
                for (let y = 0; y < 8; y++) {
                    const pixel = image[base_y + y][base_x + x];
                    const color = ((pixel[0] + pixel[1] + pixel[2]) / 3) * 256;
                    sum += color * 
                        Math.cos(((2 * x + 1) * u * 3.14) / 16) * 
                        Math.cos(((2 * y + 1) * v * 3.14) / 16)
                }
            }
            return Math.round(sum * post_dct / quants[v][u])
        }).setPrecision('single').setTactic('precision')
    }

    getDecodeDCT(cpu = false) {
        return (cpu? this.cpu : this.gpu ).createKernel(function (quants: any, data: any) {
        function alpha(z: any): any {
            if (z == 0) {
                return 1 / Math.sqrt(2)
            } else {
                return 1
            }
        }
        const base_x = this.thread.x - this.thread.x % 8
        const base_y = this.thread.y - this.thread.y % 8
        let sum = 0
        for (let u = 0; u < 8; u++) {
            for (let v = 0; v < 8; v++) {
                const post_dct = alpha(u) * alpha(v) * 
                    (data[base_y + u][base_x + v] / 256) * quants[v][u];
                sum += post_dct * 
                    Math.cos(((2 * (this.thread.x % 8) + 1) * v * 3.14) / 16) * 
                    Math.cos(((2 * (this.thread.y % 8) + 1) * u * 3.14) / 16) / 4
            }
        }
        this.color(sum, sum, sum)
      }).setPrecision('single').setTactic('precision')

    }

}
