
import fs from 'fs';

export class FileIO {
    charPointer: number;
    text: string;
    backCharPointer: number;

    constructor(fileName) {
        this.charPointer = 0;
        this.text = fs.readFileSync(fileName, 'utf-8');
    }

    nextCh() {
        return this.charPointer < this.text.length ?
            this.text[this.charPointer++] :
            null;
    }

    prevCh() {  
        if (this.backCharPointer= 0) {
            this.backCharPointer= this.charPointer;
        }       
        return this.backCharPointer > 0?
            this.text[this.backCharPointer--]:
            null;
    }
}