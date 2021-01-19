import test from 'ava';
import { bruteForce } from './helpers/lls-calculations.js';

const approximatelyEqual = (expected, actual, epsilon) => Math.abs(expected - actual) < epsilon;

// Note about ava's "deepEqual" test:
// ava distinguishes between 0 and -0 more than JavaScript itself does
test("ava: true: 0 == -0", t => {
  t.true(0 == -0);
  t.true(-0 == 0);
});
test("ava: true: 0 === -0", t => {
  t.true(0 === -0);
  t.true(-0 === 0);
});
test("ava: notDeepEqual: 0, -0", t => {
  t.notDeepEqual(0, -0);
  t.notDeepEqual(-0, 0);
});

// Test bruteForce (helper for Linear Least Squares calculations)

// epsilons carefully tweaked for the bruteForce() method AND for approximatelyEqual() in order
// for tests to pass without timing out. Passing bruteForce() smaller epsilons does result in
// more accurate solutions.
test('ontario 1A example: brute force helper finds approximate slope', t => {
  const yValues = [null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, 6.3853, 6.7494, 7.3864];
  const expectedSlope = 0.5390;
  const bruteSlope = bruteForce(yValues, 0.008).slope;

  if(approximatelyEqual(expectedSlope, bruteSlope, 0.025)) {
    t.pass();
  } else {
    t.deepEqual(expectedSlope, bruteSlope);
  };
});
test('ontario 1A example: brute force helper finds approximate y-intercept', t => {
  const yValues = [null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, 6.3853, 6.7494, 7.3864];
  const expectedYInt = 1.8886;
  const bruteYInt = bruteForce(yValues, 0.008).yInt;

  if(approximatelyEqual(expectedYInt, bruteYInt, 0.025)) {
    t.pass();
  } else {
    t.deepEqual(expectedYInt, bruteYInt);
  };
});

// these ontario 1B examples could pass with small epsilon, except it's too time-consuming to
// run with precision on this wider range of data (point 8 is huge)
test('ontario 1B example: brute force helper finds approximate slope', t => {
  const yValues = [null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, 63.853, 6.7494, 7.3864];
  const expectedSlope = 2.2805;
  const actualSlope = bruteForce(yValues, 0.2).slope;
  if(approximatelyEqual(expectedSlope, actualSlope, 0.2)) {
    t.pass();
  } else {
    t.deepEqual(expectedSlope, actualSlope);
  };
});
test('ontario 1B example: brute force helper finds approximate y-intercept', t => {
  const yValues = [null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, 63.853, 6.7494, 7.3864];
  const expectedYInt = -1.9427;
  const actualYInt = bruteForce(yValues, 0.12).yInt;
  if(approximatelyEqual(expectedYInt, actualYInt, 0.25)) {
    t.pass();
  } else {
    t.deepEqual(expectedYInt, actualYInt);
  };
});

test('ontario 1C example: brute force helper finds approximate slope', t => {
  const yValues = [null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, null, 6.7494, 7.3864];
  const expectedSlope = 0.53220;
  const actualSlope = bruteForce(yValues, 0.008).slope;
  if(approximatelyEqual(expectedSlope, actualSlope, 0.0161)) {
    t.pass();
  } else {
    t.deepEqual(expectedSlope, actualSlope);
  };
});
test('ontario 1C example: brute force helper finds approximate y-intercept', t => {
  const yValues = [null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, null, 6.7494, 7.3864];
  const expectedYInt = 1.9035;
  const actualYInt = bruteForce(yValues, 0.008).yInt;
  if(approximatelyEqual(expectedYInt, actualYInt, 0.0161)) {
    t.pass();
  } else {
    t.deepEqual(expectedYInt, actualYInt);
  };
});
