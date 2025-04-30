import { Multiplication } from './Tree/Multiplication';
import { Division } from './Tree/Division';
import { Addition } from './Tree/Addition';
import { Subtraction } from './Tree/Subtraction';
import { MinusOperation } from './Tree/MinusOperation';
import { NumberConstant } from './Tree/NumberConstant';
import { SymbolsCodes } from '../LexicalAnalyzer/SymbolsCodes';
import { LexicalAnalyzer } from '../LexicalAnalyzer/LexicalAnalyzer';
import { TreeNodeBase } from './Tree/TreeNodeBase';
import { SymbolBase } from '../LexicalAnalyzer/Symbols/SymbolBase';
import { BinaryOperation } from './Tree/BinaryOperation';

/**
 * Синтаксический анализатор - отвечает за построение синтаксического дерева
 */
export class SyntaxAnalyzer {

    lexicalAnalyzer: LexicalAnalyzer;
    symbol: SymbolBase | null;

    /**
     * Деревья, которые будут построены (например, для каждой строки исходного кода)
     */
    trees: TreeNodeBase[];

    constructor(lexicalAnalyzer: LexicalAnalyzer) {
        this.lexicalAnalyzer = lexicalAnalyzer;
        this.symbol = null;
        this.trees = [];
    }

    /**
     * Перемещаемся по последовательности "символов" лексического анализатора,
     * получая очередной "символ" ("слово")
     */
    nextSym(): void {
        this.symbol = this.lexicalAnalyzer.nextSym();
    }

    accept(expectedSymbolCode: string): void {
        if (this.symbol === null) {
            throw `${expectedSymbolCode} expected but END OF FILE found!`;
        }

        if (this.symbol.symbolCode === expectedSymbolCode) {
            this.nextSym();
        } else {
            throw `${expectedSymbolCode} expected but ${this.symbol.symbolCode} found!`;
        }
    }

    analyze(): TreeNodeBase[] {
        this.nextSym();

        while (this.symbol !== null) {
            let expression: TreeNodeBase = this.scanExpression();

            this.trees.push(expression);

            // Последняя строка может не заканчиваться переносом на следующую строку.
            if (this.symbol !== null) {
                this.accept(SymbolsCodes.endOfLine);
            }
        }

        return this.trees;
    }

    /**
     * Разбор выражения
     */
    scanExpression(): TreeNodeBase {
        let term: TreeNodeBase = this.scanTerm();
        let operationSymbol: SymbolBase | null = null;

        while (this.symbol !== null && (
            this.symbol.symbolCode === SymbolsCodes.plus ||
            this.symbol.symbolCode === SymbolsCodes.minus
        )) {

            operationSymbol = this.symbol;
            this.nextSym();

            let secondTerm: TreeNodeBase = this.scanTerm();

            switch (operationSymbol.symbolCode) {
                case SymbolsCodes.plus:
                    term = new Addition(operationSymbol, term, secondTerm);
                    break;
                case SymbolsCodes.minus:
                    term = new Subtraction(operationSymbol, term, secondTerm);
                    break;
            }
        }

        return term;
    }

    /**
     * Разбор "слагаемого"
     */
    scanTerm(): TreeNodeBase {
      
        let multiplier: TreeNodeBase = this.scanMultiplier();       
        let operationSymbol: SymbolBase | null = null;

        while (this.symbol !== null && (
            this.symbol.symbolCode === SymbolsCodes.star ||
            this.symbol.symbolCode === SymbolsCodes.slash ||
            this.symbol.symbolCode === SymbolsCodes.bracketopen
        )) {

            operationSymbol = this.symbol;
            
            if (this.symbol.symbolCode !== SymbolsCodes.bracketopen) {               
                this.nextSym();                          
            }

            let secondTerm: TreeNodeBase = this.scanMultiplier();
            switch (operationSymbol.symbolCode) {
                case SymbolsCodes.star: 
                case SymbolsCodes.bracketopen:   
                    multiplier = new Multiplication(operationSymbol, multiplier, secondTerm);
                    break;
                case SymbolsCodes.slash:
                    multiplier = new Division(operationSymbol, multiplier, secondTerm);
                    break;
            }
        }
        return multiplier;
    }

    /**
     *  Разбор "множителя"
     */
    scanMultiplier(minus:boolean=false, negative:SymbolBase=null): NumberConstant {
        if (this.symbol === null) { 
            throw `Number expected but END OF FILE found!`;
        }    
        
        switch (this.symbol.symbolCode) {
            case  SymbolsCodes.bracketopen:
                this.nextSym(); 
                let brackets:TreeNodeBase= this.scanExpression(); 
                this.accept(SymbolsCodes.bracketclose);
                if (Number.isFinite(this.symbol)){
                     brackets=new Multiplication(this.symbol,this.scanMultiplier(),brackets)
                }
                if (minus==true) {
                    return new MinusOperation(negative, brackets);
                }
                
                return brackets;
            
            case SymbolsCodes.minus: {
                negative= this.symbol;
                (minus!==true)? (minus=true): (minus=false);
                this.nextSym();
                return this.scanMultiplier(minus,negative);
                }   
        }     
        
        let integerConstant: SymbolBase | null = this.symbol;
        this.accept(SymbolsCodes.integerConst); // проверим, что текущий символ это именно константа, а не что-то еще
            let result= new NumberConstant(integerConstant); 
        if (minus==true) {
            return new MinusOperation(negative, result); 
        } else {
            return new NumberConstant(integerConstant); 
        }            
    }
}