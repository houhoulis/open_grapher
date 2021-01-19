
Did not realize that calculating a "best fit" line is not a simple problem! Not even close.

(Feel free to ignore this section if you know about this statistical topic. Clearly I know very little.)

Even putting aside multi-variable analysis and other more complicated models, of which there are many, and just drawing a "best-fit" straight line, based only on the y-axis data. There are many models (with complicated math) based on what assumptions you can make about the data, and how you want to evaluate (minimize) the difference between any data point and the best-fit line.

https://en.wikipedia.org/wiki/Simple_linear_regression
https://en.wikipedia.org/wiki/Theil-Sen_estimator

Included because they are easy to understand:
https://en.wikipedia.org/wiki/Moving_average


Did not use, but another interesting method:
https://en.wikipedia.org/wiki/Exponential_smoothing
Did not use because it assumes the initial points are the most correct ("assign exponentially decreasing weights over time").

yIntercept + point

function llsDefinition(xs, ys) {
  const length = xs.length;
  if(ys.length != length) { return 1 / 0 };
const sumX = xs.reduce((element, accum) => element + accum);
const sumY = ys.reduce((element, accum) => element + accum);

let sumProducts = 0, sumXSquares = 0;
for(let i = 0; i < xs.length; ++i) {
  sumProducts += xs[i] * ys[i];
  sumXSquares += xs[i] * xs[i];
};

const slope = (sumProducts - (sumX * sumY / xs.length)) / (sumXSquares - (sumX * sumX / xs.length));
const yInt = sumY / xs.length - slope * sumX / xs.length;
return { yInt: yInt, slope: slope };
};

// let xs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let ys = [9, 1, 0, 5, 4, 7, 7, 0, 9, 3];
// should return
// Object { yInt: 4.133333333333334, slope: 0.06666666666666667 }
// and
// xs.map((element) => result.yInt + element * result.slope);
// Array(10) [ 4.2, 4.2666666666666675, 4.333333333333334, 4.4, 4.466666666666667, 4.533333333333334, 4.6000000000000005, 4.666666666666667, 4.733333333333333, 4.800000000000001 ]

// [1,2,3,4], [6,5,7,10] should == {yInt: 3.5, slope: 1.4 };
// llsDefinition([3,4,5,6,7], [-1,1,-1,1,-1]) should? == { yInt: -0.2, slope: 0 }
// llsDefinition([3,4,5,6], [-1,1,-1,1]) should? == { yInt: -0.2, slope: 0 }
// llsDefinition([3,5,6,7,9], [-1,1,-1,1,-1]) should? == { yInt: -0.2, slope: 0 }
// llsDefinition([3,5,6,7,9], [1,-1,1,-1,1]) should? == { yInt: 0.2, slope: 0 }
// llsDefinition([3,5,6,8,9], [1,-1,1,-1,1]) should? == { yInt: 0.5263157894736841, slope: -0.052631578947368404 }
// 

function llsPoints(points) {
  const xs = points.map((x, y) => x);
  const ys = points.map((x, y) => y);
  const { yInt, slope } = llsDefinition(xs, ys);
  return points.map((x, y) => [x, x * slope + yInt]);
};

function err(lineDef, points) {
  return points.map(function(point) {
    const distance = point[1] - (point[0] * lineDef.slope + lineDef.yInt);
    return distance * distance;
   }).reduce(((accum, currentVal) => accum + currentVal), 0);
};

function bruteForce(lineDef, points) {
  let ys = points.map((point) => point[1]);
  let max = ys.reduce((accum, element) => element > accum ? element : accum);
  let min = ys.reduce((accum, element) => element < accum ? element : accum);
  let slopeRange = [min - max, max - min];
  let leng = points.length;
  let interceptRange = [slopeRange[0] * points[leng - 1][0] + min, slopeRange[1] * points[leng - 1][0] + max];
  // return { slopeRange: slopeRange, interceptRange: interceptRange };

  let solution = { error: Infinity, points: [] };
  for(let slope = slopeRange[0]; slope < 2; slope += 0.01) {
... for(let interc = -1; interc < 1; interc += 0.1) {
..... let pts = [[1, 1 * slope + interc], [2, 2 * slope + interc]];
..... let myErr = err(lineDef, pts);
..... if(myErr < lerr.err) {
....... lerr.err = myErr;
....... lerr.pts = pts;
....... }; }; };
};



file:///Users/c/d/eevee_grapher/open_grapher.html?title=grapher&subtitle=starting%201%2F1&thing0=4,3,5,4&thing%201=3,4.2,5,4.3&thing%202=4,4.8,6,3,5&start=100.5&x=date&y=lb

`npx ava`, or e.g. `npx ava -v test/test-theil-sen.js`