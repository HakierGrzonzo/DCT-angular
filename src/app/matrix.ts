import { Value } from './value';

export class Matrix {
    private _mat: Value[][];
    private iter: number = 0;

    constructor(public callback: (v: Value[][]) => void) {}

    private _onUpdate() {
        this.iter++;
        this.callback(this.asTable())
    }
    
    get modified(): number {
        return this.iter;
    }

    get mat(): number[][] {
        let res = [];
        for (let row of this._mat) {
            let tmp = [];
            for (let cell of row) {
                tmp.push(cell.val)
            }
            res.push(tmp)
        }
        return res
    }

    asTable() {
        return this._mat;
    }

    set mat(nums: number[][])  {
        this._mat = []
        for (let row of nums) {
            let tmp = []
            for (let cell of row) {
                tmp.push(new Value(cell, () => {this._onUpdate()}))
            }
            this._mat.push(tmp)
        }
        console.log(this._mat);
    }
}
