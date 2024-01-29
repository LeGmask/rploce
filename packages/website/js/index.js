'use strict';

import { Canvas } from './canvas.js';

const $canvas = document.getElementById('canvas');
const $color_picker = document.getElementById('color-picker');


window.onload = window.onresize = function() {
  // set canvas dimensions to window dimensions
  $canvas.width = window.innerWidth;
  $canvas.height = window.innerHeight;
};

let canvas = new Canvas($canvas);

$canvas.addEventListener('click', async (e) => {
  await canvas.handleClick(e, $color_picker.value);
});
