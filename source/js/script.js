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
const initSwiper = () => {
  const swiper = new Swiper(".my-swiper", {
    slidesPerView: 1,
    watchSlidesVisibility: true,

    slideToClickedSlide: true,
  });
};
const toggleFAQ = () => {
  const toggler = document.querySelector(".faq__button");
  const container = document.querySelector(".faq__container");
  toggler.addEventListener("click", () => {
    container.classList.toggle("faq__container--shown");
    if (container.classList.contains("faq__container--shown")) {
      toggler.textContent = "Скрыть";
    } else {
      toggler.textContent = "Показать все";
    }
  });
};

document.addEventListener("DOMContentLoaded", (e) => {
  setCategoriesToggler();
  initSwiper();
  toggleFAQ();
});
