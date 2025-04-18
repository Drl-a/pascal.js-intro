
import { runFile, insp } from '../../helpers/testsHelper';

/**
 * Тестируем поддержку унарного минуса
 * См. задачу:
 * @see https://fkn.ktu10.com/?q=node/16471 
 * 
 */

let pjs = runFile(import.meta.url, 'unminus.code');

test('result = -4', () => {
  expect(pjs.engine.results[0]).toBe(-4);
});

test('result = -2', () => {
  expect(pjs.engine.results[1]).toBe(-2);
});

test('result = -2', () => {
  expect(pjs.engine.results[2]).toBe(-2);
});

test('result = -3', () => {
  expect(pjs.engine.results[3]).toBe(-3);
});

test('result = 20', () => {
  expect(pjs.engine.results[4]).toBe(20);
});

test('result = 20', () => {
  expect(pjs.engine.results[5]).toBe(20);
});

test('result = -5', () => {
  expect(pjs.engine.results[6]).toBe(-5);
});

test('result = 1', () => {
  expect(pjs.engine.results[7]).toBe(1);
});

test('result = -1', () => {
  expect(pjs.engine.results[8]).toBe(-1);
});