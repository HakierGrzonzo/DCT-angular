export class Value {
    private _v: number;
    public callback: () => void;

    public constructor(n: number, callback: () => void) {
        this.callback = callback;
        this._v = n;
    }

    set val(n: number) {
        this._v = n;
        this.callback();
    }

    get val() {
        return this._v;
    }
}
