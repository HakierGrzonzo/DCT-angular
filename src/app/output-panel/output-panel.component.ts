import { Component, forwardRef } from '@angular/core';
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
  performDCT = this.dct.getDCTkernel().setOutput([8, 8])
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

  set values(v: any) {
    this._values = v
    this.res = this.performDCT(this._values) as number[][]
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
