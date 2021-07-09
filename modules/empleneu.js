export { empleneu, setAng };
import { contentsFor, CATALÀ, ENGLISH } from './lang-selector.js';

let exposició = CATALÀ;
const ésCatalà = (() => exposició === CATALÀ);

function setAng(llengua) {
  exposició = llengua;
};

function toggleAng() {
  ésCatalà() ? setAng(ENGLISH) : setAng(CATALÀ);
};

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

  document.querySelector('#llengua-canviar').innerHTML = content.llenguaText;
  document.querySelector('#bandera').setAttribute('src', content.bandera);
  document.querySelector('#títol').innerHTML = content.títol;
  document.querySelector('#intro1').innerHTML = content.intro1;
  document.querySelector('#intro2').innerHTML = content.intro2;
  document.querySelector('#intro3').innerHTML = content.intro3;
  document.querySelector('#intro4').innerHTML = content.intro4;
  document.querySelector('#intro5').innerHTML = content.intro5;
  document.querySelector('#intro6').innerHTML = content.intro6;

  // updateLlenguatgeTag();
  toggleAng();
};

// function updateLlenguatgeTag() {
//   const llenguatgeTag = document.querySelector('body');
//   if(ésCatalà()) {
//     llenguatgeTag.classList.add('català');
//   } else {
//     llenguatgeTag.classList.remove('català');
//   };
// };
