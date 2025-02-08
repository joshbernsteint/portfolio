import prettyMilliseconds from 'pretty-ms';

export function responseSize(response: string | any) : number {
    return new TextEncoder().encode(JSON.stringify(response)).length;
}

export class Timer{
    private s: number;
    private e: number;

    /** Time between the end and start (in milliseconds) */
    public delta: number;

    constructor(){
        this.s = 0;
        this.e = 0;
        this.delta = 0;
    }

    start(){
        this.s = Date.now();
    }
    end(){
        this.e = Date.now();
        this.delta = this.e - this.s;
    }

    static deltaString(delta: number) : string {
        return prettyMilliseconds(delta);
    }

    clear(): void {
        this.s = 0;
        this.e = 0;
        this.delta = 0;
    }
}