import { TreeNodeBase } from "./TreeNodeBase";
import { SymbolBase } from "src/LexicalAnalyzer/Symbols/SymbolBase";

export class Variable extends TreeNodeBase
{
    constructor(symbol: SymbolBase)
        {
            super(symbol);
        }
}