const container = document.getElementsByClassName("container")[0];

hamburger.addEventListener("click", () => {
  if (hamburger.innerHTML.includes("bars")) {
    console.log(container);
    container.style.display = "none";
  } else {
    console.log(container);
    container.style.display = "block";
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1000) {
    container.style.display = "block";
  } else {
    container.style.display = "none";
  }
});
