import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DCTService } from '../dct.service';
import { KatexOptions } from 'ng-katex';


interface probability {
    symbol: string;
    count: number;
}

@Component({
  selector: 'app-entropy-encoding',
  templateUrl: './entropy-encoding.component.html',
  styleUrls: ['./entropy-encoding.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntropyEncodingComponent),
      multi: true
    }
  ]
})
export class EntropyEncodingComponent implements ControlValueAccessor {
    _value : number[][] = null
    encoded : (number | string)[][] = null
    processed : number[][] = null
    probabilities : probability[] = null
    probablityCount = 0
    @Input("kernel") kernel: any[] = [this.dct.getDCTkernel()]
    constructor(
        private dct: DCTService
    ) { }

    ngOnInit(): void {
    }
    set value(v: number[][]) {
        this._value = v;
        this.propagateChange(v)
        let tmp = v;
        for (let i = 0; i < this.kernel.length; i++) {
            this.kernel[i].setOutput([v[0].length, v.length])
            tmp = this.kernel[i](tmp) as number[][]
        }
        this.processed = tmp
        // entropy encoding
        let x = 0
        let y = 0
        this.encoded = [[]]
        let up = false
        while (true) {
            this.encoded[this.encoded.length - 1].push(tmp[y][x])
            if (x >= 7 && y >= 7) {
                break;
            } else if (y == 7) {
                x++;
                up = true;
                this.encoded.push([])
                this.encoded[this.encoded.length - 1].push(tmp[y][x])
                if (x >= 7) {
                    break;
                }
                x++;
                y--;
            } else if (x == 7) {
                y++;
                up = false;
                this.encoded.push([])
                this.encoded[this.encoded.length - 1].push(tmp[y][x])
                x--;
                y++;
            } else if (y == 0) {
                x++;
                this.encoded.push([])
                this.encoded[this.encoded.length - 1].push(tmp[y][x])
                x--;
                y++;
                up = false;
            } else if (x == 0) {
                y++;
                this.encoded.push([])
                this.encoded[this.encoded.length - 1].push(tmp[y][x])
                x++;
                y--;
                up = true;
            } else if (up) {
                x++;
                y--;
            } else if (!up) {
                x--;
                y++;
            }
        }
        // cut zeros
        let last = [null, null]
        let breakNow = false;
        try {
            for (let i = this.encoded.length - 1; i >= 0; i--) {
                for (let j = this.encoded[i].length - 1; j >= 0; j--) {
                    if (this.encoded[i][j] == 0) {
                        this.encoded[i][j] = null
                    } else {
                        this.encoded[last[0]][last[1]] = 'EOB' 
                        breakNow = true
                        break;
                    }
                    last = [i, j]
                }
                if (breakNow) {
                    break
                }
            }
        } catch {}
        // count probability
        let prob = {}
        this.probablityCount = 0
        for (let row of this.encoded) {
            for (let w of row) {
                if (w !== null) {
                    this.probablityCount++;
                    let t = prob[w] || 0
                    prob[w] = t + 1
                }
            }
        }
        this.probabilities = []
        for (let p in prob) {
            this.probabilities.push({
                symbol: p,
                count: prob[p]
            })
        }
        this.probabilities.sort((a, b) => {
            return b.count - a.count
        })
    }
    
    get value(): number[][] {
        return this._value;
    }
    writeValue(newValue: any) {
        if (newValue !== undefined && newValue !== null) {
            this.value = newValue;
        }
    }
    propagateChange = (_: any) => {}

    registerOnChange(fn: any) {
        this.propagateChange = fn
    }

    registerOnTouched() {}
    displayKatex : KatexOptions = {
        displayMode: true
    }
}
