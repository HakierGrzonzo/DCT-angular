import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GPU } from '../../gpu-browser.min';

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
  _values: number[][]
  res: number[][]
  performDCT = this.gpu.createKernel(function (quants: any, source: any) {
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
        sum += color * Math.cos(((2 * x + 1) * u * 3.14) / 16) * Math.cos(((2 * y + 1) * v * 3.14) / 16) * post_dct / quants[v][u]
      }
    }
    const res = Math.round(sum)
    return res
  }).setOutput([8, 8])
  constructor() { }

  ngAfterViewInit(): void {
    setInterval(() => {
      this.res = this.performDCT(this.quantTable, this._values) as number[][]
    }, 100);
  }

  getStyle(c: number): any {
    let val = new Number(c).toString(16)
    if (val.length < 2) {
      val = "0" + val
    }
    console.log(val)
    let textcol = c > 128 ? "#000000" : "#FFFFFF"
    const style = {
      background: "#" + val + val + val,
      color: textcol
    }
    return style
  }

  set values(v: any) {
    this._values = v
    console.log(v)
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
