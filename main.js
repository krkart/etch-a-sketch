let board = document.querySelector('.board');
let input = document.querySelector('#squares');
let btn = document.querySelector('#submit-btn');

btn.addEventListener('click', () => {
  let userInput = parseInt(input.value);
  console.log(userInput);
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
