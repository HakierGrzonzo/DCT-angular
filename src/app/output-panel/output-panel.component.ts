import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DCTService } from '../dct.service';


@Component({
  selector: 'app-output-panel',
  templateUrl: './output-panel.component.html',
  styleUrls: ['./output-panel.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OutputPanelComponent),
      multi: true
    }
  ]
})
export class OutputPanelComponent implements ControlValueAccessor {
  _values: number[][]
  res: number[][]
  @Input("kernel") kernel: any[] = [this.dct.getDCTkernel()]
  constructor(private dct : DCTService) { }

  ngAfterViewInit(): void {
    setInterval(() => {
    }, 100);
  }

  getStyle(c: number): any {
    let n = Math.round(c / 4)
    let val = new Number(n).toString(16)
    if (n < 0) {
        val = '0';
    } else if (c / 4 > 255) {
        val = 'ff';
    }
    if (val.length < 2) {
      val = "0" + val
    }
    let textcol = n > 128 ? "#000000" : "#FFFFFF"
    const style = {
      background: "#" + val + val + val,
      color: textcol
    }
    return style
  }
    
    formatOutput(v: number): number {
        return Math.round(v * 100) / 100
    }

  set values(v: any) {
    this._values = v
    let tmp : number[][] = this._values
    for (let i = 0; i < this.kernel.length; i++) {
        this.kernel[i].setOutput([v[0].length, v.length])
        tmp = this.kernel[i](tmp) as number[][]
    }
    this.res = tmp
    this.propagateChange(v)
  }

  get values() {
    return this._values
  }

  writeValue(newValue: any) {
    if (newValue !== undefined && newValue !== null) {
      this.values = newValue
    }
  }

  propagateChange = (_: any) => {}

  registerOnChange(fn: any) {
    this.propagateChange = fn
  }

  registerOnTouched() {}
}
