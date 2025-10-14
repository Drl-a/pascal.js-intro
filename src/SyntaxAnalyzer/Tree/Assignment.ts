import { SymbolBase } from '../../LexicalAnalyzer/Symbols/SymbolBase';
import { BinaryOperation } from './BinaryOperation';
import { TreeNodeBase } from './TreeNodeBase';
import { Variable } from "/home/drl/Desktop/TraliVali/Proverka_G/pascal.js-intro/src/SyntaxAnalyzer/Tree/Variable"

export class Assignment extends BinaryOperation
{
    constructor(symbol: SymbolBase, left: Variable, right: TreeNodeBase)
    {
        super(symbol, left, right);
    }
}