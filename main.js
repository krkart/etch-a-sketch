let board = document.querySelector('.board');
let slider = document.getElementById('slider');
let sliderValue = document.getElementById('slider-value');
let resetBtn = document.querySelector('#reset-btn');
let tools = document.querySelectorAll('.bottom-container input[type="radio"]');
let bg = document.getElementById('bg');
let fg = document.getElementById('fg');

reset();

let blocks = document.querySelectorAll('.block');
bg.addEventListener('input', updateBG);
fg.addEventListener('input', updateFG);

slider.addEventListener('mouseup', () => {
  board.replaceChildren();
  let userInput = parseInt(slider.value);
  sliderValue.textContent = userInput;
  for (let i = 1; i <= userInput; i++) {
    let col = document.createElement('div')
    col.id = `c${i}`;
    col.className = 'col';
    board.appendChild(col);
    for (let j = 1; j <= userInput; j++) {
      let row = document.createElement('div');
      row.id = `c${i}r${j}`;
      row.className = 'block';
      row.style.flexBasis = `${100 / userInput}%`;
      col.appendChild(row);
    }
  }
  updateFG('draw');
  defaultTool();
})

function reset() {
  board.replaceChildren();
  sliderValue.textContent = '16';
  slider.value = 16;
  for (let i = 1; i <= slider.value; i++) {
    let col = document.createElement('div')
    col.id = `c${i}`;
    col.className = 'col';
    board.appendChild(col);
    for (let j = 1; j <= slider.value; j++) {
      let row = document.createElement('div');
      row.id = `c${i}r${j}`;
      row.className = 'block';
      row.style.flexBasis = `${100 / slider.value}%`;
      col.appendChild(row);
    }
  }
  fg.value = '#000000';
  bg.value = '#ffffff';
  updateFG('draw');
  defaultTool();
  updateBG();
}

const active = (() => {
  return (click, toolId) => {
    tools.forEach(tool => updateFG(toolId))
  }
})();

function defaultTool() {
  let draw = document.getElementById('draw');
  draw.checked = true;
}

function updateFG(toolId) {
  let blocks = document.querySelectorAll('.block');

  function updateContrast(element, darkFactor) {
    const currentColor = window.getComputedStyle(element).backgroundColor
      .match(/\d+/g)
      .map(valueStr => {  // Calculate the new RGB values after dimming
        if (darkFactor) {
          // Lower each color value by 10, limiting to 0. First convert from string to number.
          return Math.max(+valueStr - 10, 0);
        } else {
          // Increase each color value by 10, limiting to 255. First convert from string to number.
          return Math.min(+valueStr + 10, 255);
        }
      });

    return `rgb(${currentColor.join()})`;
  }

  if (toolId === 'draw') {
    blocks.forEach(block => {
      block.addEventListener('mouseover', () => {
        block.style.backgroundColor = fg.value;
      })
    });
  } else if (toolId === 'random') {
    blocks.forEach(block => {
      block.addEventListener('mouseover', function (e) {
        this.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 36%)`;
      })
    });
  } else if (toolId === 'darken') {
    blocks.forEach(block => {
      block.addEventListener('mouseover', function (e) {
        this.style.backgroundColor = updateContrast(this, true);
      })
    });
  } else if (toolId === 'lighten') {
    blocks.forEach(block => {
      block.addEventListener('mouseover', function (e) {
        console.log(updateContrast(this, false));
        this.style.backgroundColor = updateContrast(this, false);
      })
    });
  } else if (toolId === 'eraser') {
    blocks.forEach(block => {
      block.addEventListener('mouseover', () => {
        block.style.backgroundColor = bg.value;
      })
    });
  }
}

function updateBG() {
  board.style.backgroundColor = bg.value;
}

resetBtn.addEventListener('click', reset);
updateFG('draw');

/*
function clearBoard() {
  // Ref: https://stackoverflow.com/a/74886266/6028958
  // Array.from(board.children).forEach(child => child.remove());
  board.replaceChildren();
}
*/
