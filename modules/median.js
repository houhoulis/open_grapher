export { median };

function median(values) {
  const length = values.length;
  values = values.sort((a, b) => a - b);
  if(length === 0) {
    return null;
  } else if(length % 2 == 0) {
    return (values[(length / 2) - 1] + values[length / 2]) / 2;
  } else {
    return values[length / 2 - 0.5];
  }
}
