export { projeccions };

import { theilSen } from './theil-sen.js';
import { llsValues } from './linear-least-squares.js';

function projeccions(entry) {
  // console.info(entry);
  const name = entry.name, dades = entry.data;
  const theilSenEstimació = {
    name: name + ' (Theil-Sen)',
    data: theilSen(dades)
  };
  const llsEstimació = {
    name: name + ' (Linear Least Squares)',
    data: llsValues(dades)
  };

  return [theilSenEstimació, llsEstimació];
}
