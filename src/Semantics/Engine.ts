import { Addition } from '../SyntaxAnalyzer/Tree/Addition';
import { Multiplication } from '../SyntaxAnalyzer/Tree/Multiplication';
import { Subtraction } from '../SyntaxAnalyzer/Tree/Subtraction';
import { Equality } from '/home/drl/Desktop/TraliVali/Proverka_G/pascal.js-intro/src/SyntaxAnalyzer/Tree/Equality';
import { MinusOperation } from '../SyntaxAnalyzer/Tree/MinusOperation';
import { Division } from '../SyntaxAnalyzer/Tree/Division';
import { NumberConstant } from '../SyntaxAnalyzer/Tree/NumberConstant';
import { NumberVariable } from './Variables/NumberVariable';
import { Variable } from 'src/SyntaxAnalyzer/Tree/Variable';
import { TreeNodeBase } from '../SyntaxAnalyzer/Tree/TreeNodeBase';
import { BinaryOperation } from 'src/SyntaxAnalyzer/Tree/BinaryOperation';

export class Engine {
    /**
     * Результаты вычислений (изначально - один для каждой строки)
     */
    results: number[];
    variables={};

    /**
     * Деревья, которые получает на вход движок,
     * тип в данном случае определен как TreeNodeBase, потому что на верхнем уровне любого уровня 
     * лежит какой-то узел, описывающий по сути "последнюю" по вложенности операцию
     */
    trees: TreeNodeBase[];

    constructor(trees: TreeNodeBase[]) {
        this.trees = trees;
        this.results = [];
        this.variables;
    }

    run() {
        let self = this;

        this.trees.forEach(

            function (tree) {
                let result = self.evaluateSimpleExpression(tree);
                console.log(result.value);
                self.results.push(result.value); // пишем в массив результатов
            }
        );

    }

    evaluateSimpleExpression(expression: TreeNodeBase): NumberVariable {

        if (expression instanceof Addition
            || expression instanceof Subtraction) {

            let leftOperand = this.evaluateSimpleExpression(expression.left);
            let rightOperand = this.evaluateSimpleExpression(expression.right);

            let result: number | null = null;
            if (expression instanceof Addition) {
                result = leftOperand.value + rightOperand.value;
            } else if (expression instanceof Subtraction) {
                result = leftOperand.value - rightOperand.value;
            }
            return new NumberVariable(result as number);
        } else if (expression instanceof Equality && expression.left instanceof Variable) {   
            let rightOperand = this.evaluateSimpleExpression(expression.right);
            this.variables[expression.left.symbol.value]= rightOperand.value;
            return new NumberVariable(this.variables[expression.left.symbol.value]);
        } else {
            return this.evaluateTerm(expression);
        }
    }

    evaluateTerm(expression: TreeNodeBase) {
        if (expression instanceof Multiplication) {
            let leftOperand = this.evaluateTerm(expression.left);
            let rightOperand = this.evaluateTerm(expression.right);

            let result = leftOperand.value * rightOperand.value;

            return new NumberVariable(result);
        } else if (expression instanceof Division) {
            let leftOperand = this.evaluateTerm(expression.left);
            let rightOperand = this.evaluateTerm(expression.right);
            let result = leftOperand.value / rightOperand.value;

            return new NumberVariable(result);
        } else {
            return this.evaluateMultiplier(expression);
        }
    }   



    evaluateMultiplier(expression: TreeNodeBase) {
        if (expression instanceof NumberConstant) {
            return new NumberVariable(expression.symbol.value);
        } else if (expression instanceof Variable){
            if (expression.symbol.value in this.variables) {
                return new NumberVariable (this.variables[expression.symbol.value]);   
            } else {
                return expression.symbol;
            }
        } else if (expression instanceof MinusOperation) {
            if (expression.minusvalue instanceof NumberConstant) {
                return new NumberVariable (-expression.minusvalue.symbol.value);
            } else {
                let result= this.evaluateSimpleExpression(expression.minusvalue)
                return new NumberVariable(-result.value);
            }
        } else if (expression instanceof Addition || expression instanceof Subtraction || expression instanceof Equality){
            return this.evaluateSimpleExpression(expression);
        } else if (expression instanceof Multiplication || expression instanceof Division){
            return this.evaluateTerm(expression);   
        } else {     
            throw 'Number Constant expected.';
        }
    }
};