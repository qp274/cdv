let b = document.getElementById('b');
let b2 = document.getElementById('b2');
let result = document.getElementById('result');
let user = document.getElementById('user');
// let slider = document.getElementById('slider');

b.addEventListener("click", enter);
b.addEventListener("click", add);
b2.addEventListener("click", clear);
// slider.addEventListener('change', update);

function enter() {
  let n = document.getElementById('inbox').value;
}

function add() {
  let n = document.getElementById('inbox').value;
  let newresult = document.createElement('div');
  newresult.className = "wrapper";
  for (let i=1; i<=n; i+=1) {
    let newbox = document.createElement('div');
    newbox.className = "square";
    newresult.appendChild(newbox);
    randoms(newbox);
    randomp(newbox,n);
    console.log(i);
  }
  result.innerHTML=newresult.innerHTML;
}

function clear() {
  let blank = document.createElement('div');
  result.innerHTML = blank.innerHTML;
}

// function update() {
//   let value = slider.value;
//   console.log(value);
// }

function randomp(object,n) {
  let randomtop = Math.random() * window.innerHeight;
  let randomleft = Math.random() * window.innerWidth;
  let randomzindex = Math.random() * n ;
  object.style.top = randomtop+'px';
  object.style.left = randomleft+'px';
  object.style.zIndex = randomzindex;
  user.style.zIndex = n+1;
}

function randoms(object) {
  let randomsize = Math.random() * 100;
  object.style.width = randomsize +'px';
  object.style.height = randomsize +'px';
}
