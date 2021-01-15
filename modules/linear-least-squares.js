export { llsDefinition, llsValues };

import { sum } from './utils/max-min-sum.js';

function llsDefinition(values) {
console.table(values);
  const ersatzPoints = values.map((value, index) => [index, value]).filter(arr => arr[1] !== null);
  const length = ersatzPoints.length;

  const sumX = ersatzPoints.map((arr) => arr[0]).reduce(sum, 0);
  const sumY = ersatzPoints.map((arr) => arr[1]).reduce(sum, 0);

  let sumXSquares = 0, sumProducts = 0;
  ersatzPoints.forEach(function(ePoint) {
    sumXSquares += ePoint[0] * ePoint[0];
    sumProducts += ePoint[0] * ePoint[1];
  });
console.table([sumX, sumY, sumProducts, sumXSquares]);
  const slope = (sumProducts - (sumX * sumY / length)) / (sumXSquares - (sumX * sumX / length));
  const yInt = sumY / length - slope * sumX / length;
  return { yInt: yInt, slope: slope };
};

function llsValues(values) {
  const { yInt, slope } = llsDefinition(values);
  console.warn(llsDefinition(values));
  console.table([yInt, slope]);
  return values.map((_, index) => index * slope + yInt);
};


// [1,2,3,4], [6,5,7,10] should == {yInt: 3.5, slope: 1.4 };
// [6,5,7,10] should??? ==?? {yInt: 4.9, slope: 1.4 };
// see https://en.wikipedia.org/wiki/Linear_least_squares#Example
// also see bruteForceLLS([[1,6],[2,5],[3,7],[4,10]]);
