import { runFile, insp } from '../../helpers/testsHelper';

let pjs = runFile(import.meta.url, 'skobki.code');

test('result = 6', () => {
  expect(pjs.engine.results[0]).toBe(6);
});