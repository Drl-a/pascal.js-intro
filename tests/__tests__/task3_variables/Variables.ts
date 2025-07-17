import { runFile, insp } from '../../helpers/testsHelper';

let pjs = runFile(import.meta.url, 'Variables.code');
 

test('result = 2', () => {
  expect(pjs.engine.results[0]).toBe(2);
});

test('result = 8', () => {
  expect(pjs.engine.results[1]).toBe(8);
});

test('result = 16', () => {
  expect(pjs.engine.results[2]).toBe(16);
});
/**
test('result = 9', () => {
  expect(pjs.engine.results[3]).toBe(9);
});

test('result = 1', () => {
  expect(pjs.engine.results[0]).toBe(1);
});

test('result = 1', () => {
  expect(pjs.engine.results[1]).toBe(1);
});
*/