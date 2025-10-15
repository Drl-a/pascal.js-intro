import { SymbolBase } from '../../LexicalAnalyzer/Symbols/SymbolBase';
import { BinaryOperation } from './BinaryOperation';
import { TreeNodeBase } from './TreeNodeBase';
import { Variable } from 'src/SyntaxAnalyzer/Tree/Variable'
export class Assignment extends BinaryOperation
{
    constructor(symbol: SymbolBase, left: Variable, right: TreeNodeBase)
    {
        super(symbol, left, right);
    }
}