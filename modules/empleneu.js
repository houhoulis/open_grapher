export { empleneu, setAng };
import { contentsFor } from './lang-selector.js';

let exposició = 'català';

function setAng(llengua) {
  exposició = llengua;
};

const ésCatalà = (() => exposició === 'català');

function empleneu(llengua) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', empleneuDOMElements);
  } else {
    empleneuDOMElements();
  }
  document.querySelector('#llenguatge').addEventListener('click', empleneuDOMElements);
};

function empleneuDOMElements() {
  const content = contentsFor(exposició);

  const llenguaText = document.querySelector('#llengua-canviar');
  llenguaText.innerHTML = content['llenguaText'];
  const bandera = document.querySelector('#bandera');
  bandera.setAttribute('src', content['bandera']);
  const títol = document.querySelector('#títol');
  títol.innerHTML = content['títol'];
  const intro = document.querySelector('#intro');
  intro.innerHTML = content['intro'];

  updateLlenguatgeTag();
};

function updateLlenguatgeTag() {
  const llenguatgeTag = document.querySelector('body');
  if(ésCatalà) {
    llenguatgeTag.classList.add('català');
  } else {
    llenguatgeTag.classList.remove('català');
  };
};

const intro ='Proveu <a href="open-grapher.html?títol=Escriptor&subtítol=starting%201%2F1&thing0=4,3,5,4&thing%201=3,4.2,5,4.3&thing%202=4,4.8,6,3,5&start=100.5&x=date&y=weight&aproximada=">open-grapher.html?títol=Escriptor&subtítol=starting%201%2F1&thing0=4,3,5,4&thing%201=3,4.2,5,4.3&thing%202=4,4.8,6,3,5&start=100.5&x=date&y=weight&aproximada=</a>';


// function hello