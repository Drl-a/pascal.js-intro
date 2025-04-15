import { SymbolBase } from '../../LexicalAnalyzer/Symbols/SymbolBase';
import { TreeNodeBase } from './TreeNodeBase';

export class MinusOperation extends TreeNodeBase
{
    constructor(symbol: SymbolBase)
    {
        super(symbol);
    }
}

/**
export class MinusOperation
{
    value: number;

    constructor(value: number)
    {
        this.value = -value;
    }
}
    */