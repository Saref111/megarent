const tabsHandler = () => {
    const tabsButtons = document.querySelectorAll('.tabs-toggle__item');
    const tabs = document.querySelectorAll('.tabs-item');

    Array.from(tabsButtons).forEach((it, i) => {
        it.querySelector('A').addEventListener( 'click',function(e) {
            e.preventDefault();

            Array.from(tabsButtons).forEach((b) => b.classList.remove('tabs-toggle__item--current'));
            it.classList.add('tabs-toggle__item--current');

            Array.from(tabs).forEach((tab, ind) => {
                tab.classList.remove('tabs-item--current');

                if (ind === i) {
                    tab.classList.add('tabs-item--current');
                }
            });
        });
    });
};

const setStars = () => {
    const labels = Array.from(document.querySelectorAll('.review-popup__star-label'))
    
    labels.forEach((it, index) => {
        it.addEventListener('click', (e) => {
            const elementIndex = Number(e.target.previousElementSibling.value)
            labels.forEach((it, idx) => {
                it.classList.remove('review-popup__star-label--checked')
                if (idx < elementIndex) {
                    it.classList.add('review-popup__star-label--checked')
                }
            })
        })
    })
    
}

const reviewPopup = () => {
    const openPopup = () => {
        reviewPopupElement.classList.add('review-popup--shown')
    }
    const closePopup = () => {
        reviewPopupElement.classList.remove('review-popup--shown')
    }
    const reviewPopupElement = document.querySelector('.review-popup')
    const openPopupButtonElement = document.querySelector('.tabs-item__send-review')
    const closePopupButtonElement = reviewPopupElement.querySelector('.review-popup__close-btn')
    const windowPopupElement = reviewPopupElement.querySelector('.review-popup__window')

    windowPopupElement.addEventListener('click', (e) => {
        e.stopPropagation()
    })
    reviewPopupElement.addEventListener('click', closePopup)
    closePopupButtonElement.addEventListener('click', closePopup)
    openPopupButtonElement.addEventListener('click', openPopup)
}

document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper('.my-swiper', {
        slidesPerView: 1,
        watchSlidesVisibility: true,
       
        slideToClickedSlide: true
    })
    const thumbsSwiper = new Swiper('.my-swiper-thumbs', {
        spaceBetween: 22,
        slidesPerView: 3,
        slidesPerGroup: 1,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        thumbs: {
            swiper: swiper,
        },
        watchSlidesProgress: true,
        on: {
            click: (e) => {
                swiper.slideTo(thumbsSwiper.clickedIndex)
            }
        },
    })

    const otherProducts = new Swiper('.other-products__container', {
        spaceBetween: 30,
        slidesPerView: 3,
        slidesPerGroup: 3,
    })

    document.querySelector('.other-products__btn--perv').addEventListener('click', () => {
        otherProducts.slidePrev()
    })
    document.querySelector('.other-products__btn--next').addEventListener('click', () => {
        otherProducts.slideNext()
    })
    document.querySelector('.my-swiper-thumbs__btn--perv').addEventListener('click', () => {
        swiper.slidePrev()
        thumbsSwiper.slidePrev()
    })
    document.querySelector('.my-swiper-thumbs__btn--next').addEventListener('click', () => {
        swiper.slideNext()
        thumbsSwiper.slideNext()
    })

    

    tabsHandler()
    setStars()
    reviewPopup()
})