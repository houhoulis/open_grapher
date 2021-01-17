import test from 'ava';
import { theilSen } from '../modules/theil-sen.js';
import { approximatelyEqual } from './helpers/equality.js';

test('linear: 2 points', t => {
  const series = [ 1, 2 ];
  const expected = [ 1, 2 ];
  t.deepEqual(theilSen(series), expected);
});

test('linear: 2 points, but with null', t => {
  const series = [ null, 1, 2 ];
  const expected = [ 0, 1, 2 ];
  t.deepEqual(theilSen(series), expected);
});

test('linear: 2 points, going negative', t => {
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
test('non-linear: 3 points with negative', t => {
  const series = [ 0, 2, -1 ];
  const expected = [ 0, -0.5, -1 ];
  t.deepEqual(theilSen(series), expected);
});
test('non-linear: 3 points: the extreme middle point is ignored', t => {
  const series = [ 0, 13, -1 ];
  const expected = [ 0, -0.5, -1 ];
  t.deepEqual(theilSen(series), expected);
});

test('non-linear: 5 points, the outnumbered points in the middle are ignored', t => {
  const series = [ 1, 1, 0, 0, 1 ];
  const expected = [ 1, 1, 1, 1, 1 ];
  t.deepEqual(theilSen(series), expected);
});

test('non-linear: 5 points, the endpoints consist of each of the two values included in the series', t => {
  const series = [ 1, 1, 0, 0, 0 ];
  const expected = [ 1, 17/24, 10/24, 3/24, -4/24 ];
  const actual = theilSen(series);

  expected.forEach(function(yCoordinate, index) {
    if(approximatelyEqual(yCoordinate, actual[index], 0.001)) {
      t.pass();
    } else {
      t.deepEqual(yCoordinate, actual[index]);
    }
  });
});
