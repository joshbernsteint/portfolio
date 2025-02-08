export class ItemStorage {
    private storage;

    constructor(storage: Storage){
        this.storage = storage;
    }

    set<T>(key: string, value: T) : void {
        let stringVer : string = "";
        switch (typeof value) {
            case "string":
                stringVer = value;
                break;
            case "object":
                stringVer = JSON.stringify(value);
                break;
            case "number":
                stringVer = value.toString();
                break;
            default:
                break;
        }
        this.storage.setItem(key, stringVer);
    }

    get<T>(key: string) : T | null{
        const item = this.storage.getItem(key);
        if(!item) return null;

        try {
            const value = JSON.parse(item);
            return value as T;
        } catch {
            return item as T;
        }
    }

    clear(): void {
        this.storage.clear();
    }

    exists(key: string) : boolean {
        const item = this.storage.getItem(key);
        return item != null;
    }

    remove(key: string): boolean{
        const exists = this.exists(key);
        this.storage.removeItem(key);
        return exists;
    }
};

export const LocalStorage = new ItemStorage(localStorage);
export const SessionStorage = new ItemStorage(sessionStorage);