import { runFile, insp } from '../../helpers/testsHelper';

let pjs = runFile(import.meta.url, 'skobki.code');

test('result = -4', () => {
  expect(pjs.engine.results[0]).toBe(-4);
});
 
test('result = 12', () => {
  expect(pjs.engine.results[1]).toBe(12);
});

test('result = 8', () => {
  expect(pjs.engine.results[2]).toBe(8);
});

test('result = 5', () => {
  expect(pjs.engine.results[3]).toBe(5);
});
 
test('result = 1', () => {
  expect(pjs.engine.results[4]).toBe(1);
});

test('result = 12', () => {
  expect(pjs.engine.results[5]).toBe(12);
});

test('result = -20', () => {
  expect(pjs.engine.results[6]).toBe(-20);
});