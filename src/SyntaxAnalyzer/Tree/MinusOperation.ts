import { SymbolBase } from '../../LexicalAnalyzer/Symbols/SymbolBase';
import { TreeNodeBase } from './TreeNodeBase';

export class MinusOperation extends TreeNodeBase
{
    minusvalue: TreeNodeBase;
    constructor (symbol: SymbolBase, minusvalue: TreeNodeBase)
    {
        super (symbol);
        this.minusvalue= minusvalue;
    }
}


/**
 import { SymbolBase } from '../../LexicalAnalyzer/Symbols/SymbolBase';
import { TreeNodeBase } from './TreeNodeBase';

export class MinusOperation extends TreeNodeBase
{
    smth: TreeNodeBase;
    constructor (symbol: SymbolBase, smth: TreeNodeBase)
    {
        super (symbol);
        this.smth= smth;
    }
}


export class MinusOperation
{
    value: number;

    constructor(value: number)
    {
        this.value = -value;
    }
}
    */