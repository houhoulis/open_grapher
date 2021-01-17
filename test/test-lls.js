import test from 'ava';

import { approximatelyEqual } from './helpers/equality.js';
import { bruteForceLLS } from './helpers/lls-calculations.js';
import { llsDefinition, llsValues } from '../modules/linear-least-squares.js';

const EPSILON = 0.001;

// wikipedia example: [ 1,2,3,4 ], [ 6,5,7,10 ] should == { yInt: 3.5, slope: 1.4 };
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

test('wikipedia example: line: handles null value', t => {
  const yValues = [ 6, 5, null, 7, 10 ];
  const actual = llsValues(yValues);
  const expected = [ 5, 6, 7, 8, 9 ];
  // brute force "approximately equal" has to be looser than (larger than) the floating-point
  // approximation epsilon, for the test to not take too much time
  // console.log(bruteForceLLS(yValues, 0.002));
  t.deepEqual(actual, expected);
});

test('wikipedia example: line: y coordinates are calculated correctly', t => {
  const inputYCoordinates = [ 6, 5, 7, 10 ];
  const expectedYCoordinates = [ 4.9, 6.3, 7.7, 9.1 ];
  const actualYCoordinates = llsValues(inputYCoordinates);
  expectedYCoordinates.forEach(function(yCoordinate, index) {
    if(approximatelyEqual(yCoordinate, actualYCoordinates[index], EPSILON)) {
      t.pass();
    } else {
      t.deepEqual(yCoordinate, actualYCoordinates[index]);
    }
  });
});

// Ontario examples of Linear Least Squares: see
//   https://ece.uwaterloo.ca/~dwharder/NumericalAnalysis/06LeastSquares/linear/
// Example 1A: (1, 2.6228), (2, 2.9125), (3, 3.1390), (4, 4.2952), (5, 4.9918), (6, 4.6468),
//   (7, 5.4008), (8, 6.3853), (9, 6.7494), (10, 7.3864)
//   y(x) = 0.53900x + 1.8886
// Example 1B: (1, 2.6228), (2, 2.9125), (3, 3.1390), (4, 4.2952), (5, 4.9918), (6, 4.6468),
//   (7, 5.4008), (8, 63.853), (9, 6.7494), (10, 7.3864)
//   (same as example 1A, except multiply point 8's y-coordinate by 10)
//   y(x) = 2.2805 x - 1.9427
// Example 1C: same as example 1B, but drop weird point 8 entirely
//   y(x) = 0.53220 x + 1.9035
test('ontario 1A example: correct slope', t => {
  const yValues = [ null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, 6.3853, 6.7494, 7.3864 ];
  const expectedSlope = 0.5390;
  const actualSlope = llsDefinition(yValues).slope;
  if(approximatelyEqual(expectedSlope, actualSlope, EPSILON)) {
    t.pass();
  } else {
    t.deepEqual(expectedSlope, actualSlope);
  };
});
test('ontario 1A example: correct y-intercept', t => {
  const yValues = [ null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, 6.3853, 6.7494, 7.3864 ];
  const expectedYInt = 1.8886;
  const actualYInt = llsDefinition(yValues).yInt;
  if(approximatelyEqual(expectedYInt, actualYInt, EPSILON)) {
    t.pass();
  } else {
    t.deepEqual(expectedYInt, actualYInt);
  };
});

test('ontario 1B example: correct slope', t => {
  const yValues = [ null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, 63.853, 6.7494, 7.3864 ];
  const expectedSlope = 2.2805;
  const actualSlope = llsDefinition(yValues).slope;
  if(approximatelyEqual(expectedSlope, actualSlope, EPSILON)) {
    t.pass();
  } else {
    t.deepEqual(expectedSlope, actualSlope);
  };
});
test('ontario 1B example: correct y-intercept', t => {
  const yValues = [ null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, 63.853, 6.7494, 7.3864 ];
  const expectedYInt = -1.9427;
  const actualYInt = llsDefinition(yValues).yInt;
  if(approximatelyEqual(expectedYInt, actualYInt, EPSILON)) {
    t.pass();
  } else {
    t.deepEqual(expectedYInt, actualYInt);
  };
});

test('ontario 1C example: correct slope', t => {
  const yValues = [ null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, null, 6.7494, 7.3864 ];
  const expectedSlope = 0.53220;
  const actualSlope = llsDefinition(yValues).slope;
  if(approximatelyEqual(expectedSlope, actualSlope, EPSILON)) {
    t.pass();
  } else {
    t.deepEqual(expectedSlope, actualSlope);
  };
});
test('ontario 1C example: correct y-intercept', t => {
  const yValues = [ null, 2.6228, 2.9125, 3.1390, 4.2952, 4.9918, 4.6468, 5.4008, null, 6.7494, 7.3864 ];
  const expectedYInt = 1.9035;
  const actualYInt = llsDefinition(yValues).yInt;
  if(approximatelyEqual(expectedYInt, actualYInt, EPSILON)) {
    t.pass();
  } else {
    t.deepEqual(expectedYInt, actualYInt);
  };
});

// Linear Least Squares example from
//   https://github.com/semmons99/least_squares/blob/98582142f/lib/least_squares.rb
// let xs = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
// let ys = [ 9, 1, 0, 5, 4, 7, 7, 0, 9, 3 ];
// should return
//   Object { yInt: 4.133..., slope: 0.0666... }
// and points
//   Array(10) [ 4.2, 4.2666..., 4.333..., 4.4, 4.4666..., 4.533..., 4.6, 4.666..., 4.7333..., 4.8 ]
test('semmons99 example: correct slope', t => {
  const yValues = [ 9, 1, 0, 5, 4, 7, 7, 0, 9, 3 ];
  const expectedSlope = 1 / 15;
  const actualSlope = llsDefinition(yValues).slope;
  if(approximatelyEqual(expectedSlope, actualSlope, EPSILON)) {
    t.pass();
  } else {
    t.deepEqual(expectedSlope, actualSlope);
  };
});
test('semmons99 example: correct y-intercept', t => {
  // values are 1-indexed, so initial value is null
  const yValues = [ null, 9, 1, 0, 5, 4, 7, 7, 0, 9, 3 ];
  const expectedYInt = 4 + 2 / 15;
  const actualYInt = llsDefinition(yValues).yInt;
  if(approximatelyEqual(expectedYInt, actualYInt, EPSILON)) {
    t.pass();
  } else {
    t.deepEqual(expectedYInt, actualYInt);
  };
});

// Other examples:
// [0.1,0.2,0.3,0.4], [6,5,7,10] should == {yInt: 3.5, slope: 14 };
// [3,4,5,6], [-1,1,-1,1] should? == { yInt: -1.8, slope: 0.4 }
// [3,4,5,6], [1,-1,1,-1] should? == { yInt: 1.8, slope: -0.4 }
// [3,4,5,6,7], [-1,1,-1,1,-1] should == { yInt: -0.2, slope: 0 }
// [3,5,6,7,9], [-1,1,-1,1,-1] should? == { yInt: -0.2, slope: 0 }
// [3,5,6,7,9], [1,0,1,0,1] should? == { yInt: 0.7, slope: 0 }
// [3,5,6,8,9], [1,-1,1,-1,1] should? == { yInt: 0.526316..., slope: -0.0526316... }
