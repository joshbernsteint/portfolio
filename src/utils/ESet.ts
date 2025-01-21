class ESet<T> extends Set<T>{
    constructor(...args : any[]){
        super(...args)
    }

    addArray(arr: T[]){
        arr.forEach(e => this.add(e));
    }

    toArray() : T[]{
        return Array.from(this.values())
    }
}


export default ESet;