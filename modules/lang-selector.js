export { contentsFor, CATALÀ, ENGLISH };

const CATALÀ = 'català';
const ENGLISH = 'english';

const contents = {
  català: {
    llenguaText: 'Switch to English',
    bandera: 'flag-of-the-united-states.svg',
    títol: 'Obert Escriptor',
    intro1: "Per exemple, 'open-grapher.html?lamevaseqüència=1,2,3' dibuixarà un gràfic al vostre navegador amb els punts 1, 2 i 3 en ordre, etiquetats 'lamevaseqüència'. Intenta-ho: apuntar '?lamevaseqüència=1,2,3' fins al final de l'URL a la barra d'ubicació del navegador i premeu la tecla de retorn o feu clic <a href='open-grapher.html?lamevaseqüència=1,2,3'>open-grapher.html?lamevaseqüència=1,2,3</a>.",
    intro2: 'intro dos',
    intro3: 'intro tres',
    intro4: 'Aquesta pàgina suportarà almenys català i anglès',
    intro5: 'intro cinc',
    intro6: 'intro sis',
  },
  english: {
    llenguaText: 'Canviar a català',
    bandera: 'bandera-de-catalunya.svg',
    títol: 'Open Grapher',
    intro1: 'This is an entirely client-side, in-browser grapher of sequence(s) you add to the URL. That means you can graph any sequence(s) of numbers you like by adding them to the URL, without data being sent to any server; this is done entirely on your computer. For example, "open-grapher.html?mysequence=1,2,3" will draw a graph in your browser with the points 1, 2, and 3 in order, labeled "mysequence". Try it: add "?mysequence=1,2,3" to the end of the URL in the browser location bar and hit the Return key, or just click <a href="open-grapher.html?mysequence=1,2,3">open-grapher.html?mysequence=1,2,3</a>.',
    intro2: 'Any query string you add to the URL in the form <i>"word=number,number,number,,,number,number"</i> will be interpreted as a sequence to be graphed. If two commas are next to each other, that point in the sequence will be skipped. You can add any number of these query strings to the URL -- all series will be graphed. In addition, these special query strings are available:',
    intro3: 'If "aproximada", or "approximate", is set to anything in the query string, then each series of data will be graphed accompanied by best-fit lines. The best-fit lines are calculated via <a href="https://en.wikipedia.org/wiki/Theil%E2%80%93Sen_estimator">Theil-Sen</a> and <a href="https://en.wikipedia.org/wiki/Linear_least_squares">Linear Least Squares</a>. I created this page in order to explore best-fit lines.',
    intro4: 'This page will support at least Catalan and English.',
    intro5: 'Here is an example. For a graph with two series, click here:<br /><a href="open-grapher.html?títol=My New Graph&subtítol=A simple graph with two series&some data=4,5,5.7,3,5&some different data=1.3,3.3,2.3,1.3&inici=1&x=day&y=weight">open-grapher.html?títol=My New Graph&subtítol=A simple graph with two series&some data=4,5,5.7,3,5&some different data=1.3,3.3,2.3,1.3&inici=1&x=day&y=weight</a><br />Or, for the same graph with best-fit lines added for each series, click here, where the "aproximada" term has been added to the URL:<br /><a href="open-grapher.html?títol=My New Graph&subtítol=A simple graph with two series&some data=4,5,5.7,3,5&some different data=1.3,3.3,2.3,1.3&inici=1&x=day&y=weight&aproximada=123">open-grapher.html?títol=My New Graph&subtítol=A simple graph with two series&some data=4,5,5.7,3,5&some different data=1.3,3.3,2.3,1.3&inici=1&x=day&y=weight&aproximada=123</a>',
    intro6: "Edit the URL in the browser's location bar to draw your own graph!",

  },
};

function contentsFor(llenguatge) {
  return contents[llenguatge];
};
