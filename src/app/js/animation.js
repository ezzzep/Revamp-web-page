const scrollElements = () => document.querySelectorAll(".scroll-fade-up");

const elementInView = (el, offset = 0) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) - offset
  );
};

const displayScrollElement = (element) => element.classList.add("visible");
const hideScrollElement = (element) => element.classList.remove("visible");

const handleScrollAnimation = () => {
  scrollElements().forEach((el) => {
    if (elementInView(el, 50)) displayScrollElement(el);
    else hideScrollElement(el);
  });
};

window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("load", handleScrollAnimation);

const observeDynamicContent = (containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  const observer = new MutationObserver(() => handleScrollAnimation());
  observer.observe(container, { childList: true, subtree: true });
};

[
  "meetMarci-container",
  "discover-container-placeholder",
  "creds-container-placeholder",
  "findHome-container-placeholder",
  "gallery-container-placeholder",
].forEach(observeDynamicContent);
