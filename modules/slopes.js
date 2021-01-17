export { pairwiseSlopes };

function pairwiseSlopes(series) {
  let calculatedSlopes = [];
  const ersatzPoints = series.map((value, index) => [index, value]);
  const valid = (ePoints) => ePoints.filter(arr => arr[1] !== null);
  if(valid(ersatzPoints).length < 2) {
    return [];
  };
  valid(ersatzPoints).forEach(function(point) {
    const others = ersatzPoints.slice(point[0] + 1);
    valid(others).forEach(function(other) {
      calculatedSlopes.push((point[1] - other[1]) / (point[0] - other[0]));
    });
  });
  return calculatedSlopes;
};
