let parent = document.querySelector('.parent');
let input = document.querySelector('#squares');
let btn = document.querySelector('#submit-btn');

btn.addEventListener('click', () => {
  let userInput = parseInt(input.value);
  console.log(userInput);
  for (let i = 1; i <= userInput; i++) {
    let childDiv = document.createElement('div');
    childDiv.className = 'child';
    childDiv.textContent = `${i}`;
    parent.appendChild(childDiv);
  }
})
