
import fs from 'fs';

export class FileIO {
    charPointer: number;
    text: string;
    backCharPointer: number=0;

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
       /* if (this.backCharPointer=== 0) {
            this.backCharPointer= this.charPointer;
        }       */
        return this.charPointer > 0?
            this.text[this.charPointer+2]:
            null;
    }
}