export { approximatelyEqual };

const approximatelyEqual = (expected, actual, epsilon) => Math.abs(expected - actual) < epsilon;
