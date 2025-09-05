if (".slider-page-title-home".length > 0) {
    var swiper = new Swiper(".slider-page-title-home", {
        slidesPerView: 1,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        speed: 1000,
        navigation: {
            nextEl: ".page-title-next",
            prevEl: ".page-title-prev",
        },
        pagination: {
            el: ".pagination-page-title-home",
            clickable: true,
        },
    });
}

if (".slider-testimonial-thumbs".length > 0) {
    var thumbSwiper = new Swiper(".slider-testimonial-thumbs", {
        slidesPerView: 1,
        spaceBetween: 0,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
}

if (".slider-testimonial".length > 0) {
    var swiper = new Swiper(".slider-testimonial", {
        spaceBetween: 0,
        slidesPerView: 1,
        pagination: {
            el: ".pagination-testimonial",
            clickable: true,
        },
        thumbs: {
            swiper: thumbSwiper,
        },
    });
}

if (".slider-testimonial-center".length > 0) {
    var swiper = new Swiper(".slider-testimonial-center", {
        spaceBetween: 30,
        slidesPerView: 1,
        centeredSlides: true,
        observer: true,
        observeParents: true,
        loop: true,
        breakpoints: {
            0: {
                slidesPerView: 1.1,
            },
            767: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 2.1,
            },
            1200: {
                slidesPerView: 3.5,
            },
        },
    });
}

if (".slider-testimonial-1".length > 0) {
    var swiper = new Swiper(".slider-testimonial-1", {
        spaceBetween: 30,
        centeredSlides: true,
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: ".pagination-testimonial-1",
            clickable: true,
        },
    });
}

if (".slider-layout-3".length > 0) {
    var swiper = new Swiper(".slider-layout-3", {
        spaceBetween: 30,
        slidesPerView: 3,
        pagination: {
            el: ".pagination-layout",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            550: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 2.4,
            },
            991: {
                slidesPerView: 3,
            },
        },
    });
}

if (".slider-layout-4".length > 0) {
    var swiper = new Swiper(".slider-layout-4", {
        spaceBetween: 30,
        slidesPerView: 4,
        pagination: {
            el: ".pagination-layout",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            550: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 3,
            },
            991: {
                slidesPerView: 4,
            },
        },
    });
}
