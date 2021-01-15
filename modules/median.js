export { median };

function median(values) {
  // console.error('median:'); console.table(values);
  const length = values.length;
  values = values.sort((a, b) => a - b);
  // console.table(values);
  if(length === 0) {
    return null;
  } else if(length % 2 == 0) {
    return (values[(length / 2) - 1] + values[length / 2]) / 2;
  } else {
    return values[length / 2 - 0.5];
  }
}
