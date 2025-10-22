const track = document.getElementById("carouselTrack");
const slides = Array.from(track.children);
const prevButton = document.querySelector(".carousel-nav.prev");
const nextButton = document.querySelector(".carousel-nav.next");
const indicatorsContainer = document.getElementById("carouselIndicators");

let currentIndex = 0;

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  const amountToMove = -slideWidth * currentIndex;
  track.style.transition = "transform 0.5s ease"; 
  track.style.transform = `translateX(${amountToMove}px)`;
  updateIndicators();
}

function moveCarousel(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  } else if (currentIndex >= slides.length) {
    currentIndex = 0;
  }

  updateCarousel();
}

function createIndicators() {
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("indicator-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
    indicatorsContainer.appendChild(dot);
  });
}

function updateIndicators() {
  const dots = indicatorsContainer.children;
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.toggle("active", i === currentIndex);
  }
}

let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

track.addEventListener("touchstart", touchStart);
track.addEventListener("touchmove", touchMove);
track.addEventListener("touchend", touchEnd);

function touchStart(event) {
  startX = event.touches[0].clientX;
  prevTranslate = -slides[0].getBoundingClientRect().width * currentIndex;
  track.style.transition = "none"; 
  isDragging = true;
}

function touchMove(event) {
  if (!isDragging) return;
  const currentX = event.touches[0].clientX;
  const deltaX = currentX - startX;
  currentTranslate = prevTranslate + deltaX;
  track.style.transform = `translateX(${currentTranslate}px)`;
}

function touchEnd(event) {
  isDragging = false;
  const slideWidth = slides[0].getBoundingClientRect().width;
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -50 && currentIndex < slides.length - 1) {
    currentIndex += 1;
  } else if (movedBy > 50 && currentIndex > 0) {
    currentIndex -= 1;
  }

  updateCarousel();
}

createIndicators();
updateCarousel();

prevButton.addEventListener("click", () => moveCarousel(-1));
nextButton.addEventListener("click", () => moveCarousel(1));

window.moveCarousel = moveCarousel;
