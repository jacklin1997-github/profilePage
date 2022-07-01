const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector(".result");
let currentShooterIndex = 202;
const width = 15;
let direction = 1;
let invadersID;
let goingRight = true;
let aliensRemoved = [];
let result = 0;

for (i = 0; i <= 225; i++) {
  //取得標的
  const square = document.createElement("div");
  //將square放入grid
  grid.appendChild(square);
}

const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

const squares = Array.from(document.querySelectorAll(".grid div"));

const invadersDraw = function () {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add("invaders");
    }
  }
};

const invadersRemove = function () {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove("invaders");
  }
};

squares[currentShooterIndex].classList.add("shooter");

const moveShooter = function (e) {
  squares[currentShooterIndex].classList.remove("shooter");
  console.log(e);
  switch (e.key) {
    case "ArrowLeft":
      if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
      break;
    case "ArrowRight":
      if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
      break;
  }
  squares[currentShooterIndex].classList.add("shooter");
};
document.addEventListener("keydown", moveShooter);

const moveAlienInvaders = function () {
  const atLeftEdge = alienInvaders[0] % width === 0;
  //只要最後一隻外星人除以15 餘14 就是到達最右邊。
  const atRightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;
  invadersRemove();


  //利用正負1來掌控方向

  if (atRightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }
  if (atLeftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - 1;
      direction = 1;
      goingRight = true;
    }
  }
  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }
  invadersDraw();
  if (squares[currentShooterIndex].classList.contains("invaders", "shooter")) {
    resultDisplay.innerHTML = "GAME OVER";
    clearInterval(invadersID);
  }
  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders[i] > squares.length) {
      resultDisplay.innerHTML = "GAME OVER";
      clearInterval(invadersID);
    }
  }
  if (aliensRemoved.length === alienInvaders.length) {
    resultDisplay.innerHTML = "YOU WIN!";
    clearInterval(invadersID);
  }
};

invadersID = setInterval(moveAlienInvaders, 500);

const shoot = function (e) {
  let laserID;
  let currentLaserIndex = currentShooterIndex;
  const moveLaser = function () {
    squares[currentLaserIndex].classList.remove("laser");
    currentLaserIndex -= width;
    squares[currentLaserIndex].classList.add("laser");
    if (squares[currentLaserIndex].classList.contains("invaders")) {
      squares[currentLaserIndex].classList.remove("laser");
      squares[currentLaserIndex].classList.remove("invaders");
      squares[currentLaserIndex].classList.add("explode");

      setTimeout(() => {
        squares[currentLaserIndex].classList.remove("explode");
      }, 100);
      clearInterval(laserID);

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
      aliensRemoved.push(alienRemoved);

      result++;
      resultDisplay.innerHTML = result;
    }
  };

  switch (e.key) {
    case "ArrowUp":
      laserID = setInterval(moveLaser, 100);
  }
};

document.addEventListener("keydown", shoot);
