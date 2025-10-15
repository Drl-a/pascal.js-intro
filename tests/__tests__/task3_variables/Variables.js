import { runFile, insp } from '../../helpers/testsHelper';

let pjs = runFile(import.meta.url, 'Variables.code');
 
test('result = 2', () => {
  expect(pjs.engine.results[0]).toBe(8);
});