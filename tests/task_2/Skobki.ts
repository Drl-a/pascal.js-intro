import { runFile, insp } from '/home/drl/Desktop/TraliVali/Proverka_G/pascal.js-intro/tests/helpers/testsHelper';


let pjs = runFile(import.meta.url, 'skobki.code');

test('result = 22', () => {
  expect(pjs.engine.results[0]).toBe(22);
});