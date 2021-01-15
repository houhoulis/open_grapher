import test from 'ava';

import { llsError, bruteForceLLS } from './helpers/lls-calculations.js';
import { llsDefinition, llsValues } from '../modules/linear-least-squares.js';

// let xs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let ys = [9, 1, 0, 5, 4, 7, 7, 0, 9, 3];
// should return
// Object { yInt: 4.133333333333334, slope: 0.06666666666666667 }
// and
// xs.map((element) => result.yInt + element * result.slope);
// Array(10) [ 4.2, 4.2666666666666675, 4.333333333333334, 4.4, 4.466666666666667, 4.533333333333334, 4.6000000000000005, 4.666666666666667, 4.733333333333333, 4.800000000000001 ]

// [0.1,0.2,0.3,0.4], [6,5,7,10] should == {yInt: 3.5, slope: 14 };
// llsDefinition([3,4,5,6], [-1,1,-1,1]) should? == { yInt: -1.8, slope: 0.4 }
// llsDefinition([3,4,5,6], [1,-1,1,-1]) should? == { yInt: 1.8, slope: -0.4 }
// llsDefinition([3,4,5,6,7], [-1,1,-1,1,-1]) should == { yInt: -0.2, slope: 0 }
// llsDefinition([3,5,6,7,9], [-1,1,-1,1,-1]) should? == { yInt: -0.2, slope: 0 }
// llsDefinition([3,5,6,7,9], [1,0,1,0,1]) should? == { yInt: 0.7, slope: 0 }
// llsDefinition([3,5,6,8,9], [1,-1,1,-1,1]) should? == { yInt: 0.5263157894736841, slope: -0.052631578947368404 }
//

// brute force "approximately equal" has to be looser than this epsilon
const EPSILON = 0.001;
const approximatelyEqual = (expected, actual, epsilon) => Math.abs(expected - actual) < epsilon;

// make llsDefinition use points e.g. [ [1,6], [2,5], [3,7], [4,10] ]

// [1,2,3,4], [6,5,7,10] should == {yInt: 3.5, slope: 1.4 };
test('wikipedia example: slope', t => {
  const yValues = [ 6, 5, 7, 10 ];
  const slope = llsDefinition(yValues).slope;
  const expected = 1.4;
  if(approximatelyEqual(slope, expected, EPSILON)) {
    t.pass();
  } else {
    t.deepEqual(slope, expected);
  };
});

test('wikipedia example: y-intercept', t => {
  const yValues = [ 6, 5, 7, 10 ];
  const yInt = llsDefinition(yValues).yInt;
  const expected = 4.9;
  if(approximatelyEqual(yInt, expected, EPSILON)) {
    t.pass();
  } else {
    t.deepEqual(yInt, expected);
  };
});

// [ [1,6], [2,5], [3,7], [4,10] ] should, using {yInt: 3.5, slope: 1.4 }, result in
// [ [1,4.9], [2,6.3], [3,7.7], [4,9.1]]
test('wikipedia example: line: handles null value', t => {
  const yValues = [ 6, 5, null, 7, 10 ];
  const actual = llsValues(yValues);
  const expected = [5.1, 6.1, 7.1, 8.1, 9.1];
  console.log("llsDefinnition:");
  console.log(llsDefinition(yValues));
  console.log("brute force:");
  console.log(bruteForceLLS(yValues.map((val, index) => [index, val])));
  t.deepEqual(actual, expected);
});

test('wikipedia example: line: y coordinates are calculated correctly', t => {
  const inputYCoordinates = [6,5,7,10];//[ [1,6], [2,5], [3,7], [4,10] ];
  const expectedYCoordinates = [ 4.9, 6.3, 7.7, 9.1 ];
  const actualYCoordinates = llsValues(inputYCoordinates);
  console.log(actualYCoordinates);
  expectedYCoordinates.forEach(function(yCoordinate, index) {
    if(approximatelyEqual(yCoordinate, actualYCoordinates[index], EPSILON)) {
      t.pass();
    } else {
      t.deepEqual(yCoordinate, actualYCoordinates[index]);
    }
  });
});

// ontario examples of llsdefinition:
// line1A: (1, 2.6228), (2, 2.9125), (3, 3.1390), (4, 4.2952), (5, 4.9918), (6, 4.6468), (7, 5.4008), (8, 6.3853), (9, 6.7494), (10, 7.3864)
//   y(x) = 0.53900x + 1.8886
// line1B: (1, 2.6228), (2, 2.9125), (3, 3.1390), (4, 4.2952), (5, 4.9918), (6, 4.6468), (7, 5.4008), (8, 63.853), (9, 6.7494), (10, 7.3864)
// (line1A except point 8 * 10)
//   y(x) = 2.2805 x - 1.9427
// line1C: line1B but drop weird point 8
//   y(x) = 0.53220 x + 1.9035
test('ontario 1A: slope', t => {
  const yValues = [null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, 6.3853, 6.7494, 7.3864];
  const expectedSlope = 0.5390;
  const actualSlope = llsDefinition(yValues).slope;
  if(approximatelyEqual(expectedSlope, actualSlope, EPSILON)) {
    t.pass();
  } else {
    t.deepEqual(expectedSlope, actualSlope);
  };
});
test('ontario 1A: y-intercept', t => {
  const yValues = [null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, 6.3853, 6.7494, 7.3864];
  const expectedYInt = 1.8886;
  const actualYInt = llsDefinition(yValues).yInt;
  if(approximatelyEqual(expectedYInt, actualYInt, EPSILON)) {
    t.pass();
  } else {
    t.deepEqual(expectedYInt, actualYInt);
  };
});
//  y(x) = 2.2805 x - 1.9427
// line1C: line1B but drop weird point 8
//  y(x) = 0.53220 x + 1.9035

test('ontario 1B: slope', t => {
  const yValues = [null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, 63.853, 6.7494, 7.3864];
  const expectedSlope = 2.2805;
  const actualSlope = llsDefinition(yValues).slope;
  if(approximatelyEqual(expectedSlope, actualSlope, EPSILON)) {
    t.pass();
  } else {
    t.deepEqual(expectedSlope, actualSlope);
  };
});
test('ontario 1B: y-intercept', t => {
  const yValues = [null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, 63.853, 6.7494, 7.3864];
  const expectedYInt = -1.9427;
  const actualYInt = llsDefinition(yValues).yInt;
  if(approximatelyEqual(expectedYInt, actualYInt, EPSILON)) {
    t.pass();
  } else {
    t.deepEqual(expectedYInt, actualYInt);
  };
});

test('ontario 1C: slope', t => {
  const yValues = [null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, null, 6.7494, 7.3864];
  const expectedSlope = 0.53220;
  const actualSlope = llsDefinition(yValues).slope;
  if(approximatelyEqual(expectedSlope, actualSlope, EPSILON)) {
    t.pass();
  } else {
    t.deepEqual(expectedSlope, actualSlope);
  };
});
test('ontario 1C: y-intercept', t => {
  const yValues = [null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, null, 6.7494, 7.3864];
  const expectedYInt = 1.9035;
  const actualYInt = llsDefinition(yValues).yInt;
  if(approximatelyEqual(expectedYInt, actualYInt, EPSILON)) {
    t.pass();
  } else {
    t.deepEqual(expectedYInt, actualYInt);
  };
});
