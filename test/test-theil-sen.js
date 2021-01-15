import test from 'ava';
import { theilSen } from '../modules/theil-sen.js';

test('linear: 2 points', t => {
  const series = [ 1, 2 ];
  const expected = [ 1, 2 ];
  t.deepEqual(theilSen(series), expected);
});

test('linear: 2 points with null', t => {
  const series = [ null, 1, 2 ];
  const expected = [ 0, 1, 2 ];
  t.deepEqual(theilSen(series), expected);
});

test('linear: 2 points, negative', t => {
  const series = [ 1, -2 ];
  const expected = [ 1, -2 ];
  t.deepEqual(theilSen(series), expected);
});

test('linear: 3 points', t => {
  const series = [ 0, 1, 2 ];
  const expected = [ 0, 1, 2 ];
  t.deepEqual(theilSen(series), expected);
});

test('linear: 3 points w/ null & negative', t => {
  const series = [ 0, null, -2 ];
  const expected = [ 0, -1, -2 ];
  t.deepEqual(theilSen(series), expected);
});
test('non-linear: 3 points', t => {
  const series = [ 0, 2, 1 ];
  const expected = [ 0, 0.5, 1 ];
  t.deepEqual(theilSen(series), expected);
});
test('non-linear: 3 points part deux', t => {
  const series = [ 0, 2, -1 ];
  const expected = [ 0, -0.5, -1 ];
  t.deepEqual(theilSen(series), expected);
});
test('non-linear: 3 points part 13', t => {
  const series = [ 0, 13, -1 ];
  const expected = [ 0, -0.5, -1 ];
  t.deepEqual(theilSen(series), expected);
});

test('non-linear: 5 points', t => {
  const series = [ 1, 1, 0, 0, 1 ];
  const expected = [ 1, 1, 1, 1, 1 ];
  t.deepEqual(theilSen(series), expected);
});

test('non-linear: 5 points part deux', t => {
  const series = [ 1, 1, 0, 0, 0 ];
  const expected = [ 1, 17/24, 10/24, 3/24, -4/24 ];
  t.deepEqual(theilSen(series), expected);
});

