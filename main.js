let board = document.querySelector('.board');
let slider = document.querySelector('input[type="range"]');
let sliderValue = document.querySelector('.slider-value');
let resetBtn = document.querySelector('#reset-btn');
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
      row.style.flexBasis = `${100/userInput}%`;
      col.appendChild(row);
    }
  }
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
      row.style.flexBasis = `${100/slider.value}%`;
      col.appendChild(row);
    }
  }
}

function updateFG() {
  blocks.forEach(block => {
    block.addEventListener('mouseover', () => {
      block.style.backgroundColor = fg.value;
    })
  });
}

function updateBG() {
  board.style.backgroundColor = bg.value;
}

resetBtn.addEventListener('click', reset);
updateFG();

/*
function clearBoard() {
  // Ref: https://stackoverflow.com/a/74886266/6028958
  // Array.from(board.children).forEach(child => child.remove());
  board.replaceChildren();
}
*/
