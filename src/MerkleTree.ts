import type { Hasher } from "./hasher";


export interface IMerkelTree {
    createTree: (listOfString: string[]) => void;
    root: () => string;
    height: () => number;
    level: (level: number) => string[];
}

export default class MerkelTree implements IMerkelTree {
    private _root: string[][];
    hasher: Hasher;
    constructor(hashProvider: Hasher) {
        this._root = [];
        this.hasher = hashProvider;
    }
    createTree(listOfString: string[]) {
        this._root.unshift(listOfString);
        this._root.unshift(listOfString.map(s => this.hasher(s)));

        while (this._root[0].length > 1) {
            let temp = [];
            for (let index = 0; index < this._root[0].length; index += 2) {
                if (index < this._root[0].length - 1 && index % 2 == 0)
                    temp.push(this.hasher(this._root[0][index] + this._root[0][index + 1]));
                else temp.push(this._root[0][index]);
            }
            this._root.unshift(temp);
        }
    }
    root(): string {
        return this._root[0][0];
    }
    height(): number {
        return this._root.length;
    }
    level(level: number): string[] {
        return this._root[this._root.length - level - 1];
    }
}