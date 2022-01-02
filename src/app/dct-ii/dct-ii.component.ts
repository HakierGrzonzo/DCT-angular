import { Component, OnInit } from '@angular/core';
import { DCTService } from '../dct.service';
import { KatexOptions } from 'ng-katex';

@Component({
  selector: 'app-dct-ii',
  templateUrl: './dct-ii.component.html',
  styleUrls: ['./dct-ii.component.scss']
})
export class DctIIComponent implements OnInit {
    factor = 0;
    katex = `128 \\cdot \\cos \\left( ${this.factor / 50} x \\right)`;
    vals : number[][] = [[]]
    kernel2 = this.dct.getDCT2()
    kernel3 = this.dct.getDCT3()
    quant = this.dct.getQuant()
    constructor(private dct: DCTService) {
        for (let x = 0; x < 8; x++) {
            this.vals[0].push(Math.round(Math.cos(0 * x) * 128))
        }
    }

    ngOnInit(): void {
    }

    displayKatex : KatexOptions = {
        displayMode: true,
    }
    
    onChange(v: number) {
        let tmp = [[]]
        for (let x = 0; x < 8; x++) {
            tmp[0].push(Math.round(Math.cos((v / 50) * x) * 128))
        }
        this.vals = tmp;
        this.katex = `128 \\cdot \\cos \\left( ${v / 50} x \\right)`
    }

}
