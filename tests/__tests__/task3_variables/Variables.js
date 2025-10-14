import { runFile, insp } from '../../helpers/testsHelper';

let pjs = runFile(import.meta.url, 'Variables.code');
 
test('result = 2', () => {
  expect(pjs.engine.results[0]).toBe(8);
});
/** 
test('result = 2', () => {
  expect(pjs.engine.results[0]).toBe(8);
});

test('result = 8', () => {
  expect(pjs.engine.results[1]).toBe(16);
});
test('result = 8', () => {
  expect(pjs.engine.results[2]).toBe(5);
});
test('result = 8', () => {
  expect(pjs.engine.results[3]).toBe(5);
});
test('result = 8', () => {
  expect(pjs.engine.results[4]).toBe(5);
});
test('result = -4', () => {
  expect(pjs.engine.results[5]).toBe(-4);
});

test('result = 9', () => {
  expect(pjs.engine.results[6]).toBe(9);
});
test('result = 9', () => {
  expect(pjs.engine.results[7]).toBe(9);
});
*/