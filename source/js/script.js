const setCategoriesToggler = () => {
  const categoriesTogglerElement = document.querySelector(
    ".categories__button"
  );
  const categoriesBackgroundElement = document.querySelector(
    ".categories__wrapper"
  );
  const categoriesListElement = document.querySelector(".categories__list");

  const clickHandler = (e) => {
    categoriesBackgroundElement.addEventListener("click", clickHandler);
    categoriesListElement.classList.toggle("categories__list--shown");
    categoriesBackgroundElement.classList.toggle("categories__wrapper--shown");
  };

  categoriesTogglerElement.addEventListener("click", clickHandler);
};

document.addEventListener("DOMContentLoaded", (e) => {
  setCategoriesToggler();
});
