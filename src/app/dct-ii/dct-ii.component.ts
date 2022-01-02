import { Component, OnInit } from '@angular/core';
import { DCTService } from '../dct.service';
import { KatexOptions } from 'ng-katex';

@Component({
  selector: 'app-dct-ii',
  templateUrl: './dct-ii.component.html',
  styleUrls: ['./dct-ii.component.scss']
})
export class DctIIComponent implements OnInit {
    factor = [0, 25];
    katex = `128 \\cdot \\cos \\left( ${this.factor[0] / 50} x \\right)` + 
        `+ 64\\cdot \\cos \\left( ${this.factor[1] / 50} x \\right)`;
    vals : number[][] = [[]]
    kernel2 = this.dct.getDCT2()
    kernel3 = this.dct.getDCT3()
    quant = this.dct.getQuant()
    unquant = this.dct.getUnQuant()
    constructor(public dct: DCTService) {
        let tmp = [[]]
        for (let x = 0; x < 8; x++) {
            tmp[0].push(Math.round(Math.cos((this.factor[0] / 50) * x) * 128 +
                                  Math.cos((this.factor[1] / 50) * x) * 64))

        }
        this.vals = tmp;
    }

    ngOnInit(): void {
    }

    displayKatex : KatexOptions = {
        displayMode: true,
    }
    
    onChange(_: number) {
        let tmp = [[]]
        for (let x = 0; x < 8; x++) {
            tmp[0].push(Math.round(Math.cos((this.factor[0] / 50) * x) * 128 +
                                  Math.cos((this.factor[1] / 50) * x) * 64))

        }
        this.vals = tmp;
        this.katex = `128 \\cdot \\cos \\left( ${this.factor[0] / 50} x \\right)` + 
            `+ 64\\cdot \\cos \\left( ${this.factor[1] / 50} x \\right)`;
    }

}
