const addCategory = document.getElementById("add-category");
const backdrop = document.getElementsByClassName("backdrop")[0];
const addCategoryForm = document.getElementsByClassName("add-category-form")[0];
const closeForm = document.getElementById("close-form");
const categoryForm = document.getElementById("category-form");

addCategory.addEventListener("click", function () {
  backdrop.style.display = "block";
  addCategoryForm.style.display = "block";
});

closeForm.addEventListener("click", function () {
  backdrop.style.display = "none";
  addCategoryForm.style.display = "none";
});

categoryForm.addEventListener("submit", function () {
  backdrop.style.display = "none";
  addCategoryForm.style.display = "none";
});
