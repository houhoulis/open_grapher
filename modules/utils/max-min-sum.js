export { max, min, sum };

const max = (array) => array.reduce((accum, element) => element > accum ? element : accum);
const min = (array) => array.reduce((accum, element) => element < accum ? element : accum);
const sum = (accum, currentVal) => accum + currentVal;
