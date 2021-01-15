import { projeccions } from './modules/projeccions.js';

document.querySelector('p').addEventListener('click', function() {
  window.location.assign(window.location.href + "&thingee=-1,-2,-3,-4,-5,-6,-7,-8,-9,-10")
});

let consulta = new URLSearchParams(window.location.search);

const metadades = {
  títol: gatherMetadades('títol', 'title'),
  subtítol: gatherMetadades('subtítol', 'subtitle'),
  x: gatherMetadades('x'),
  y: gatherMetadades('y'),
  inici: gatherMetadades('inici', 'start'),
  llengua: gatherMetadades('llengua', 'language'),
  aprox: gatherMetadades('aproximada', 'approximate'),
};

// For the first key in the query that has a non-empty value, return the value.
// Delete ALL keys from the query.
function gatherMetadades(...keys) {
  let value = null;
  keys.forEach(function(key) {
    if(!value) {
      const resultat = consulta.get(key);
      if(resultat) {
        value = resultat;
      };
    };
    consulta.delete(key);
  });
  return value;
};

function gatherGraphDades() {
  let graphDades = [];
  consulta.forEach(function(value, key) {
    if(value) {
      const dades = value.
        split(',').
        map(function(entry) {
          entry = parseFloat(entry);
          if(isNaN(entry)) { entry = null };
          return entry;
        });
      // console.log(dades);
      graphDades.push({
        name: key,
        data: dades
      });
    };
  });
  return graphDades;
};

const ésAng = (() => metadades.llengua.toLowerCase() == 'english' || langButton.classList.contains('cat'));
const aproximant = (() => Boolean(metadades.aprox));

function graphEntries() {
  let resultats = gatherGraphDades();
  console.error(metadades);
  if(aproximant()) {
    resultats = resultats.flatMap((entry) => [entry].concat(projeccions(entry)));
      // { name: entry.name + 'projecc',
      //   data: projeccions(entry.data)
      // }
  }

  // hack to shove in theil-sen attempt
  // let theil_sen_thing = {
  //   name: resultats[0].name + 'theil',
  //   data: projeccions(resultats[0].data)
  // }
  // resultats.push(theil_sen_thing);
  // console.warn(theil_sen_thing);
  console.log(resultats);
  return resultats
};

const startPoint = (() => parseFloat(metadades['inici']) || 0);
const chartStructure = {
  title: { text: metadades.títol },
  subtitle: { text: metadades.subtítol },
  xAxis: {
    title: { text: metadades.x }
  },
  yAxis: {
    title: { text: metadades.y }
  },
  legend: {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'top',
    y: 50
  },
  plotOptions: {
    series: {
      pointStart: startPoint(),
      connectNulls: true
    }
  },
  series: graphEntries()
}

var chart = Highcharts.chart('container', chartStructure);
