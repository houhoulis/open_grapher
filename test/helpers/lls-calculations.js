export { bruteForce };

import { max, min, sum } from '../../modules/utils/max-min-sum.js';

function bruteForceError(lineDef, points) {
  return points.map(function(point) {
    const distance = point[1] - (point[0] * lineDef.slope + lineDef.yInt);
    return distance * distance;
  }).reduce(sum, 0);
};

// bruteForce() is not very clever. The wider the range of values, the harder it works to
// hone in on the solution.
// Passing in smaller epsilons results in more accurate solutions but takes more time. Tests
// will be in danger of failing due to taking too long (e.g. more than 10 seconds).
// Writing a better brute-force solver is certainly possible.
function bruteForce(values, epsilon) {
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

  let solution = { error: Infinity, slope: null, intercept: null };
  for(let slope = slopeRange.minimum; slope < slopeRange.maximum; slope += epsilon) {
    for(let intercept = interceptRange.minimum; intercept < interceptRange.maximum; intercept += epsilon) {
      const lineDef = { yInt: intercept, slope: slope };
      const myError = bruteForceError(lineDef, ersatzPoints);
      if(myError < solution.error) {
        solution.error = myError;
        solution.slope = slope;
        solution.yInt = intercept;
      };
    };
  };
  return solution;
};
