'use strict';

import { Canvas } from './canvas.js';

const socket = io("http://localhost:3004");

const $canvas = document.getElementById('canvas');
const $color_picker = document.getElementById('color-picker');

const canvas = new Canvas($canvas, socket);


window.onload = window.onresize = function() {
  // set canvas dimensions to window dimensions
  $canvas.width = window.innerWidth;
  $canvas.height = window.innerHeight;
  canvas.render(); // trigger canvas
};

$canvas.addEventListener('click', async (e) => {
  await canvas.handleClick(e, $color_picker.value);
});

socket.on('update_pixel', (data) => {
  canvas.set_pixel(data.x, data.y, data.color);
  canvas.render();
});
