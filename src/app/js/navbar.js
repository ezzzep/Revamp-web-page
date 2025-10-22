const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const navbar = document.querySelector(".navbar");
const logoImg = document.querySelector(".logo-img");
const burgerBtnImg = document.querySelector(".burger-button");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
    logoImg.src = "./assets/img/marciMetzgerHomesBlack.png";
    burgerBtnImg.src = "./assets/svg/burgerIconBlack.svg";
  } else {
    navbar.classList.remove("scrolled");
    logoImg.src = "./assets/img/marciMetzgerHomes.png";
    burgerBtnImg.src = "./assets/svg/burgerIcon.svg";
  }
});

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  mobileMenu.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.add("hidden");
  }
});

logoImg.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
