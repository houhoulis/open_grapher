export { contentsFor };

const contents = {
  català: {
    llenguaText: 'Switch to English',
    bandera: 'flag-of-the-united-states.svg',
    títol: 'Obert Escriptor',
    intro: 'h´llø th´r´',
  },
  english: {
    llenguaText: 'Canviar a català',
    bandera: 'bandera-de-catalunya.svg',
    títol: 'Open Grapher',
    intro: 'hello there',
  },
};

function contentsFor(llenguatge) {
  return contents[llenguatge];
};


// };

const text = {
  cat: {
    queryStrings: {
      title: 'títol',
      subtitle: 'subtítol',
      x: 'x',
      y: 'y',
      inici: 'inici',
      llengua: 'llengua',
      // lang: 'cat',
      approx: 'aproximada',
    },
    htmlStrings: {
      lang: 'cat',
      title: querySelector.title || 'Obert Escriptor',
      xAxis: 'eix x',
      yAxis: 'eix y',
      label: 'etiqueta',
      explainer: 'blah blah blah',
      switchLang: 'switch to: English',
      // tongue: 'llengua',
    },
  },
  en: {
    queryStrings: {
      title: 'títol',
      subtitle: 'subtítol',
      x: 'x',
      y: 'y',
      llengua: 'language',
      approx: 'aproximada',
    },
    htmlStrings: {
      lang: 'cat',
      title: 'Open Grapher',
      xAxis: 'eix x',
      yAxis: 'eix y',
      label: 'etiqueta',
      explainer: 'blah blah blah',
      switchLang: 'canviar a: català',
      // tongue: 'llengua',
    },
  }
};

const location = {
  htmlStrings: {
    lang: document.querySelector('html').attributes['lang'].value,
    title: document.querySelector('title').textContent,
    switchLang = document.querySelector('#language'),
    ā/* a */
  }};

const isCat = (() => langButton.classList.contains('cat'));
const isEng = (() => langButton.classList.contains('eng') || 
if(clicked && isCat) {
  classList.remove('cat');
  classList.add('en')

  