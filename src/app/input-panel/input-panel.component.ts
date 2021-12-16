import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-input-panel',
  templateUrl: './input-panel.component.html',
  styleUrls: ['./input-panel.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPanelComponent),
      multi: true
    }
  ]
})
export class InputPanelComponent implements ControlValueAccessor {
  _values: number[][]
  constructor() {
  }

  getStyle(c: number): any {
    let val = new Number(c).toString(16)
    if (val.length < 2) {
      val = "0" + val
    }
    let textcol = c > 128 ? "#000000" : "#FFFFFF"
    const style = {
      background: "#" + val + val + val,
      color: textcol
    }
    return style
  }

  onedit(i: number, j:number, e: any) {
    this._values[i][j] = parseInt(e.target.value)
    this.propagateChange(this._values)
  }

  get values() {
    return this._values
  }

  set values(v: any) {
    this._values = v
    this.propagateChange(v)
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
