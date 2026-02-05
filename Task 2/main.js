const arrow = document.getElementById("arrow");
const target = document.getElementById("target");
const scoreDisplay = document.getElementById("score");
const bow = document.getElementById("bow");
let score = 0;
let arrowMoving = false;
let targetDirection = 1;
let gameRunning = false;
let timeLeft = 30;
let timerInterval = null;
let targetInterval = null;

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
// bow.style.transform = "rotate(46deg)"

// let bowWidth = Math.sqrt(bow.clientWidth ** 2 + bow.clientHeight ** 2); 
// let bowHeight = bowWidth

function startTargetMovement() {
  if (targetInterval) return;
  targetInterval = setInterval(() => {
    let top = target.offsetTop;
    if (top <= 0 || top >= window.innerHeight - 120) {
      targetDirection *= -1;
    }
    target.style.top = top + (5 * targetDirection) + "px";
  }, 50);
}

function stopTargetMovement() {
  if (targetInterval) {
    clearInterval(targetInterval);
    targetInterval = null;
  }
}

function startGame() {
  if (gameRunning) return;
  gameRunning = true;
  score = 0;
  scoreDisplay.textContent = "Score: " + score;
  timeLeft = 30;
  const timerEl = document.getElementById("timer");
  if (timerEl) timerEl.textContent = "Time: " + timeLeft;
  startTargetMovement();
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timerEl) timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
      stopGame();
    }
  }, 1000);
}

function stopGame() {
  if (!gameRunning) return;
  gameRunning = false;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  stopTargetMovement();
  resetArrow();
}
let rotationAngle = 0;
let launchAngle = 0;
document.addEventListener("mousemove", (e) => {
  const rect = bow.getBoundingClientRect();
  const bowCenterX = rect.left + rect.width / 2;
  const bowCenterY = rect.top + rect.height / 2;
  const dx = e.clientX - bowCenterX;
  const dy = e.clientY - bowCenterY;
  rotationAngle = Math.atan2(dy, dx);
  const maxAngle = 1.39626;
  if (rotationAngle > maxAngle) rotationAngle = maxAngle;
  if (rotationAngle < -maxAngle) rotationAngle = -maxAngle;
  bow.style.transform = `translateY(-50%) rotate(${rotationAngle}rad)`;
});

document.addEventListener("click", (e) => {
  if (!gameRunning) return;
  if (e.target && e.target.closest && e.target.closest('#controls')) return;
  if (arrowMoving) return;
  launchAngle = rotationAngle;
  arrowMoving = true;
  arrow.style.display = "block";

  const rect = bow.getBoundingClientRect();
  const arrowRect = arrow.getBoundingClientRect();
  const startX = rect.left + rect.width; // start at bow's right edge
  const startY = rect.top + rect.height / 2 - arrowRect.height / 2;

  const speed = Math.max(window.innerWidth, window.innerHeight) * 0.9; // pixels per second
  const vx = speed * Math.cos(launchAngle);
  const vy = speed * Math.sin(launchAngle);
  const gravity = 1000; // px/s^2 (downwards)

  const startTime = { value: null };

  function frame(ts) {
    if (!startTime.value) startTime.value = ts;
    const t = (ts - startTime.value) / 1000; // seconds

    const x = startX + vx * t;
    const y = startY + vy * t + 0.5 * gravity * t * t;

    arrow.style.left = x + "px";
    arrow.style.top = y + "px";
    arrow.style.transform = `rotate(${launchAngle}rad)`;

    // Collision detection using bounding rects
    const aRect = arrow.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();

    const hit = aRect.right >= tRect.left && aRect.left <= tRect.right &&
                aRect.bottom >= tRect.top && aRect.top <= tRect.bottom;

    if (hit) {
      score++;
      scoreDisplay.textContent = "Score: " + score;
      resetArrow();
      return;
    }

    // Off-screen check
    if (aRect.left > window.innerWidth || aRect.top > window.innerHeight || aRect.bottom < 0) {
      resetArrow();
      return;
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
});
function resetArrow() {
  arrowMoving = false;
  arrow.style.display = "none";
}