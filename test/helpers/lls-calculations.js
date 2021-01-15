export { llsError, bruteForceLLS };

import { max, min, sum } from '../../modules/utils/max-min-sum.js';

function llsError(lineDef, points) {
  return points.map(function(point) {
    const distance = point[1] - (point[0] * lineDef.slope + lineDef.yInt);
    return distance * distance;
  }).reduce(sum, 0);
};

function bruteForceLLS(values, epsilon) {
  const ersatzPoints = values.map((value, index) => [index, value]).filter(arr => arr[1] !== null);
  let ys = ersatzPoints.map((point) => point[1]);
  let maxY = max(ys);
  let minY = min(ys);
  let maxX = max(ersatzPoints.map((point) => point[0]));
  // Other than the first point, which has no predecessor, calculate the slope between
  // every point and its predecessor
  let slopes = ersatzPoints.slice(1).map((point, index) => (point[1] - ersatzPoints[index][1]) / (point[0] - ersatzPoints[index][0]));
  let slopeRange = { minimum: min(slopes), maximum: max(slopes) };
  let interceptRange = { minimum: minY + slopeRange.minimum * maxX, maximum: maxY + slopeRange.maximum * maxX };
console.log( { slopeRange: slopeRange, interceptRange: interceptRange } );

  let solution = { error: Infinity, slope: null, intercept: null };
  // const slopeEpsilon = (slopeRange.maximum - slopeRange.minimum) / 1000;
  // const interceptEpsilon = (interceptRange.maximum - interceptRange.minimum) / 1000;
  for(let slope = slopeRange.minimum; slope < slopeRange.maximum; slope += epsilon) {
    for(let intercept = interceptRange.minimum; intercept < interceptRange.maximum; intercept += epsilon) {
      const lineDef = { yInt: intercept, slope: slope };
      const myError = llsError(lineDef, ersatzPoints);
      if(myError < solution.error) {
        solution.error = myError;
        solution.slope = slope;
        solution.yInt = intercept;
      };
    };
  };
  return solution;
};
