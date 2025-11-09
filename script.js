function initialize() {
  "use strict";

  /**
   * @typedef {HTMLInputElement}
   */
  const colorOverride = document.getElementById('colorOverride');

  document
    .getElementById('refreshField')
    .addEventListener('click', (_evt) => {
      prepareCanvas(requestSize());
    });

  const res = {
    prepareCanvas: prepareCanvas
  };
  return res;

  /**
   * Size validation
   * @param {number} size 
   * @returns {boolean} if size is valid
   */
  function validateSize(size) {
    if (size > 100 || size < 16) {
      console.error('Invalid size');
      return false;
    }
    return true;
  }

  /**
   * @returns {HTMLDivElement}
   */
  function makeCell() {
    const res = document.createElement('div');
    res.classList.toggle('cell');
    res.addEventListener('mouseenter', mouseEnter);
    res.addEventListener('click', click);
    res.addEventListener('contextmenu', rightClick);
    return res;
  }

  /**
   * @returns {HTMLDivElement}
   */
  function makeRow() {
    const res = document.createElement('div');
    res.classList.toggle('row');
    return res;
  }

  /**
   * Prepares the canvas for sketch
   * @param {number} size 
   */
  function prepareCanvas(size) {
    if (!validateSize(size)) return;

    /**
     * host to draw the sketch at
     * @type {HTMLDivElement}
     */
    const host = document.getElementById('content');
    host.innerText = '';

    for (let i = 0; i < size; i++) {
      const row = makeRow();
      for (let j = 0; j < size; j++)
        row.appendChild(makeCell());
      host.appendChild(row);
    }
  }

  /**
   * Requests a canvas size form user
   * @returns {number} size of canvas
   */
  function requestSize() {
    let valid = false;
    let size = 0;
    do {
      const res = prompt('Choose canvas size, a number 16 to 100');

      try {
        size = new Number(res);
        valid = validateSize(size);
      }
      catch {
        alert('Invalid size!');
        console.error('Invalid size');
      }
    }
    while (!valid)

    return size;
  }

  /**
   * draws something over the pixel
   * @param {MouseEvent} evnt 
   */
  function mouseEnter(evnt) {
    /**
     * the exact pixel to color
     * @typedef {HTMLDivElement}
     */
    const pixel = evnt.target;

    if (!pixel.style.backgroundColor || colorOverride.checked) {
      pixel.style.backgroundColor = getRandomColor();
    }

    try {
      const opacity = Number(pixel.style.opacity);
      if (opacity < 1) {
        pixel.style.opacity = opacity + 0.1;
      }
    }
    catch {
      console.error('Invalid opacity operation');
    }
  }

  function click(evnt) {
    evnt.target.style.backgroundColor = getRandomColor();
  }

  function rightClick(evnt) {
    evnt.preventDefault();
    const pixel = evnt.target;
    try {
      const opacity = Number(pixel.style.opacity);
      if (opacity < 1) {
        pixel.style.opacity = opacity + 0.1;
      } else {
        pixel.style.opacity = 0.1;
      }
    }
    catch {
      console.error('Invalid opacity operation');
    }
    return false;
  }

  /**
   * generates a random color
   * @returns {string}
   */
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

};

document.addEventListener('DOMContentLoaded', initialize().prepareCanvas(16));