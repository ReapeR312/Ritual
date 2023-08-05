let offset = 0;
let intervalId;
let timerId;
let x1 = null;
let y1 = null;
const interval = 5000;
const timeout = 15000;
const sliderLine = document.querySelector(".review__slider");
const bgLines = document.querySelector(".bg-lines");
const bgLinesM = document.querySelector(".bg-lines-m");
sliderLine.addEventListener("touchstart", handleTouchStart, false);
sliderLine.addEventListener("touchmove", handleTouchMove, false);
sliderLine.addEventListener("mousedown", handleTouchStart, false);
sliderLine.addEventListener("mousemove", handleTouchMove, false);

function handleTouchStart(event) {
  const firstTouch = event.touches ? event.touches[0] : event;
  x1 = firstTouch.clientX;
  y1 = firstTouch.clientY;
}

function handleTouchMove(event) {
  if (!x1 || !y1) {
    return false;
  }
  let x2 = event.touches ? event.touches[0].clientX : event.clientX;
  let y2 = event.touches ? event.touches[0].clientY : event.clientY;
  let xDiff = x2 - x1;
  let yDiff = y2 - y1;
  if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 200) {
    if (xDiff > 0) {
      offset = offset - 1023;
      linesMove();
      if (offset < 0) {
        offset = 0;
      }
      sliderLine.style.right = offset + "px";
      clearInterval(intervalId);
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        intervalSlider();
      }, timeout);
    } else {
      offset = offset + 1023;
      linesMove();
      if (offset > 1023) {
        offset = 1023;
      }
      sliderLine.style.right = offset + "px";
      clearInterval(intervalId);
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        intervalSlider();
      }, timeout);
    }
  } else return NaN;
  x1 = null;
  y1 = null;
}

function intervalSlider() {
  intervalId = setInterval(() => {
    if (offset > 0) {
      offset = 0;
    } else {
      offset = +1023;
    }
    sliderLine.style.right = offset + "px";
    linesMove();
  }, interval);
}

intervalSlider();
function linesMove() {
  if (offset == 0) {
    bgLines.style.left = 0 + "px";
    bgLinesM.style.top = 0 + "px";
  } else if (offset == 1023) {
    bgLines.style.left = 50 + "px";
    bgLinesM.style.top = 10 + "px";
  }
}
