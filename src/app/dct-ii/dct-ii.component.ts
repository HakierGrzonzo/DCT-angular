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
    katex = '';
    vals : number[][] = [[]]
    kernel = this.dct.getDCT2()
    constructor(private dct: DCTService) {
        for (let x = 0; x < 8; x++) {
            this.vals[0].push(Math.round(Math.cos(2 * x) * 128 + 128))
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
            tmp[0].push(Math.round(Math.cos((v / 50) * x) * 256))
        }
        this.vals = tmp;
        this.katex = `256 \\cdot \\cos \\left( ${v / 50} x \\right)`
    }

}
