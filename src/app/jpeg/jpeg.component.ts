import { Component, OnInit } from '@angular/core';
import { KatexOptions } from 'ng-katex';
import { DCTService } from '../dct.service';

interface presetOption {
    name: string,
    generator: (x: number, y: number) => number
}

@Component({
  selector: 'app-jpeg',
  templateUrl: './jpeg.component.html',
  styleUrls: ['./jpeg.component.scss']
})
export class JpegComponent implements OnInit {
    presets : presetOption[] = [
        {
            name: 'Pusty',
            generator: (_: number, _2: number) => {
                return 0
            }
        },
        {
            name: 'Paski pionowe',
            generator: (x: number, _: number) => {
                return (x % 2 == 0 ? 255 : 0)
            }
        },
        {
            name: 'Paski poziome',
            generator: (_: number, y: number) => {
                return (y % 2 == 0 ? 255 : 0)
            }
        },
        {
            name: 'Paski skośne',
            generator: (x: number, y: number) => {
                const l = [y - 6, y - 3, y, y + 3, y + 6]
                return (l.includes(x) ? 255 : 0)
            }
        },
        {
            name: 'sinus',
            generator: (x: number, _: number) => {
                return Math.round(Math.sin(x) * 128 + 128) 
            }
        },
        {
            name: 'cosinus',
            generator: (x: number, _: number) => {
                return Math.round(Math.cos(x) * 128 + 128) 
            }
        },
        {
            name: 'Szachownica',
            generator: (x: number, y: number) => {
                return (y % 2 == x % 2  ? 255 : 0)
            }
        },
        {
            name: 'Kołopodobne',
            generator: (x: number, y: number) => {
                function square(a: number): number {
                    return a * a
                }
                function inCircle(a : number, b: number, r: number) {
                    return square(a - 3.5) + square(b - 3.5) < r
                }
                if (inCircle(x, y, 7)) {
                    return 255;
                } else if (inCircle(x, y, 9)) {
                    return 128;
                }
                return 0;
            }
        },
        {
            name: 'Okręgopodobne',
            generator: (x: number, y: number) => {
                function square(a: number): number {
                    return a * a
                }
                function inCircle(a : number, b: number, r: number) {
                    return square(a - 3.5) + square(b - 3.5) < r
                }
                return (inCircle(x, y, 9) && !inCircle(x, y, 4)? 255 : 0)
            }
        },
        {
            name: 'Parabolka',
            generator: (x: number, y: number) => {
                function square(a: number): number {
                    return a * a
                }
                return (square(x - 3.5) < y ? 255 : 0)
            }
        },
        {
            name: 'Gradient x + y',
            generator: (x: number, y: number) => {
                return Math.round((x + y) * 18.21)
            }
        },
    ]
    selectedPreset : presetOption = this.presets[0]

    vals : number[][] = [[]]
    
    onPresetChange(e: presetOption) {
        const generator = e.generator
        let tmp = [];
        for (let i = 0; i < 8; i++) {
            let tmp2 = []
            for (let j = 0; j < 8; j++) {
                tmp2.push(generator(j, i))
            }
            tmp.push(tmp2)
        }
        this.vals = tmp
    }

    constructor(
        public dct: DCTService
    ) { }

    ngOnInit(): void {
        let tmp = [];
        for (let i = 0; i < 8; i++) {
            let tmp2 = []
            for (let j = 0; j < 8; j++) {
                tmp2.push(this.selectedPreset.generator(j, i))
            }
            tmp.push(tmp2)
        }
        this.vals = tmp
    }

    displayKatex : KatexOptions = {
        displayMode: true
    }
}
