import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Matrix } from '../matrix';
import { Value } from '../value';


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
    _values : Matrix = new Matrix((v) => {this.propagateChange(this.values)});
    constructor() {
    }

    getStyle(c: Value): any {
        let val = new Number(c.val).toString(16)
        if (val.length < 2) {
            val = "0" + val
        }
        let textcol = c.val > 128 ? "#000000" : "#FFFFFF"
        const style = {
            background: "#" + val + val + val,
            color: textcol
        }
        return style
    }

    get values() {
        return this._values.mat
    }

    set values(v: any) {
        this._values.mat = v
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

    hasMatChanged(_: any, mat: any) {
        try {
            return this._values.modified;
        } catch {
            return -1;
        }
    }
}
