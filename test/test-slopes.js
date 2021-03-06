import test from 'ava';

import { pairwiseSlopes } from '../modules/slopes.js';

function arrayShallowEqual(t, actual, expected) {
  t.is(actual.length, expected.length);
  actual.forEach(function(elt, i) {
    let expectedValue = expected[i];
    if(elt == -0) { elt = 0; };
    if(expectedValue == -0) { expectedValue = 0; };
    t.deepEqual(elt, expectedValue);
  });
};

test("no slopes for no points", t => {
  t.deepEqual(pairwiseSlopes([]), []);
});

test("no slopes for 1 point", t => {
  t.deepEqual(pairwiseSlopes([1]), []);
});

test("simple positive slope for 2 points", t => {
  t.deepEqual(pairwiseSlopes([-1,2]), [3]);
});

test("simple negative slope for 2 points", t => {
  t.deepEqual(pairwiseSlopes([2,1]), [-1]);
});

test("slopes for [0,0]", t => {
  const expected = [0];
  const actual = pairwiseSlopes([0,0]);
  arrayShallowEqual(t, actual, expected);
});

// ava also allows this terse syntax when using a "macro"
test("slopes for [1,2,1] are [1,0,-1]", arrayShallowEqual, pairwiseSlopes([1,2,1]), [1,0,-1]);

test("slopes for [-2,-1,0,1,2] are ten 1s", arrayShallowEqual, pairwiseSlopes([-2,-1,0,1,2]), Array(10).fill(1));

test("steeper slopes have stronger influence: positive", t => {
  const points = [0,-1,1,0];
  const expected = [-1,0.5,0,2,0.5,-1];
  const actual = pairwiseSlopes(points);
  arrayShallowEqual(t, actual, expected);
});

test("steeper slopes have stronger influence: negative", t => {
  const points = [0,1,-1,0];
  const expected = [1,-0.5,0,-2,-0.5,1];
  const actual = pairwiseSlopes(points);
  arrayShallowEqual(t, actual, expected);
});
