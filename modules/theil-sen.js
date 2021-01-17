export { theilSen };

import { pairwiseSlopes } from './slopes.js';
import { median } from './median.js';

function theilSen(series) {
  const calculatedSlopes = pairwiseSlopes(series);

  const slopeFit = median(calculatedSlopes);
  const validPoints = series.map((value, index) => [index, value]).filter(arr => arr[1] !== null);
  const y_intercept = median(validPoints.map(point => point[1] - slopeFit * point[0]));
  return series.map((value, index) => index).map(index => slopeFit * index + y_intercept);
};
