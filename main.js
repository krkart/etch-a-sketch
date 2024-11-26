let board = document.querySelector('.board');
let slider = document.querySelector('input[type="range"]');
let sliderValue = document.querySelector('.slider-value');

slider.addEventListener('mouseup', () => {
  let userInput = parseInt(slider.value);
  sliderValue.textContent = `${userInput}`;
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
