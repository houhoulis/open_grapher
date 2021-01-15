export { theilSen };

import { slopes } from './slopes.js';
import { median } from './median.js';

// function theilSen(series) {
//   console.warn("theil-sen accepted series:")
//   console.warn(series);
//   const slopeResults = slopes(series);


//   // let slosum = slopes.reduce(((accum, elt) => accum + elt[2]), 0);
//   // console.warn("slosum: " + typeof(slosum) + slosum);
//   // // console.table(slopes);
//   const slope_fit = median(slopeResults);//.map(arr => arr[2]));
//   // console.info("slope_fit: " + slope_fit);
//   const ersatzPoints = series.map((value, index) => [index, value]).filter(arr => arr[1] !== null);
//   const y_intercept = median(ersatzPoints).map(point => point[1] - slope_fit * point[0]);
//   console.warn("y_intercept: " + y_intercept);
//   // console.error( ersatzPoints.map(point => slope_fit * point[0] + y_intercept));
//   return series.map((value, index) => [index, value]).map(point => slope_fit * point[0] + y_intercept);

// };

function theilSen(series) {
  console.warn("theil-sen accepted series:")
  console.warn(series);
  const calculatedSlopes = slopes(series);


  // let slosum = slopes.reduce(((accum, elt) => accum + elt[2]), 0);
  // console.warn("slosum: " + typeof(slosum) + slosum);
  // // console.table(slopes);
  const slopeFit = median(calculatedSlopes);//.map(arr => arr[2]));
  console.info("slopeFit: " + slopeFit);
  const validPoints = series.map((value, index) => [index, value]).filter(arr => arr[1] !== null);
  const y_intercept = median(validPoints.map(point => point[1] - slopeFit * point[0]));
  console.warn("y_intercept: " + y_intercept);
  // console.error( validPoints.map(point => slopeFit * point[0] + y_intercept));
  return series.map((value, index) => index).map(index => slopeFit * index + y_intercept);
};
