const hamburger = document.getElementById("hamburger");
const hamburger_nav = document.getElementsByClassName("hamburger-nav")[0];
const backdrop = document.getElementsByClassName("backdrop")[0];
const body = document.getElementsByTagName("body")[0];

hamburger.addEventListener("click", () => {
  if (hamburger.innerHTML.includes("bars")) {
    hamburger.innerHTML = '<i class="fas fa-times"></i>';
    hamburger_nav.style.display = "block";
    backdrop.style.display = "block";
  } else {
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger_nav.style.display = "none";
    backdrop.style.display = "none";
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1000) {
    hamburger_nav.style.display = "none";
    backdrop.style.display = "none";
  }
});
