'use strict'

// TODO: touch events

const divs = document.querySelectorAll('.gallery_imgBx');
const body = document.querySelector('.gallery');
const prev = document.querySelector('.lightbox__button--prev');
const next = document.querySelector('.lightbox__button--next');
const closeBtn = document.querySelector('.lightbox__button--close');
// const show = document.querySelector('.show');
// const events = document.createEvent('HTMLEvents');


const checkPrev = () => document.querySelector('.lightbox__button--prev').classList.contains('show');
const checkNext = () => document.querySelector('.lightbox__button--next').classList.contains('show');
const checkClose = () => document.querySelector('.lightbox__button--close').classList.contains('show');

Array.prototype.slice.call(divs).forEach(function (el) {
    el.addEventListener('click', function () {
        this.classList.toggle('show');
        body.classList.toggle('active');

        window.addEventListener('keydown', scrolling);
        window.addEventListener('keyup', closeModalByKey);
        checkNext();
        checkPrev();
        checkClose();
    });
});

prev.addEventListener('click', scrollingBack);
next.addEventListener('click', scrollingForward);
closeBtn.addEventListener('click', closeLightBox);



//Дополнительно: закрытие по "ESC" и клику не по картинке

function closeLightBox() {
    const show = document.querySelector('.show');
    const events = document.createEvent('HTMLEvents');

    events.initEvent('click', true, false);
    show.classList.remove('show');
    body.classList.toggle('active');

    window.removeEventListener('keyup', closeModalByKey);
    window.removeEventListener('keydown', scrolling);
}

function closeModalByKey(e) {
    if (e.code === 'Escape') {
        closeLightBox();
    }
};

function closeModal(e) {
    if (e.target.tagName !== 'IMG' && e.target !== nextImgBtn && e.target !== prevImgBtn) {
        closeLightBox();
    }
};

function scrollingForward(e) {
    const show = document.querySelector('.show');
    const events = document.createEvent('HTMLEvents');
    events.initEvent('click', true, false);

    show.nextElementSibling.dispatchEvent(events);
    show.classList.remove('show');
    body.classList.toggle('active');
    checkPrev();
};

function scrollingBack(e) {
    const show = document.querySelector('.show');
    const events = document.createEvent('HTMLEvents');
    events.initEvent('click', true, false);

    show.previousElementSibling.dispatchEvent(events);
    show.classList.remove('show');
    body.classList.toggle('active');
    checkNext();
};

// Дополнительно: пролистывание изо. в открытом модальном окне кнопками "влево" и "вправо"

function scrolling(e) {
    if (e.code === 'ArrowRight') {
        const show = document.querySelector('.show');
        const events = document.createEvent('HTMLEvents');
        events.initEvent('click', true, false);

        show.nextElementSibling.dispatchEvent(events);
        show.classList.remove('show');
        body.classList.toggle('active');
        checkPrev();
    };

    if (e.code === 'ArrowLeft') {
        const show = document.querySelector('.show');
        const events = document.createEvent('HTMLEvents');
        events.initEvent('click', true, false);

        show.previousElementSibling.dispatchEvent(events);
        show.classList.remove('show');
        body.classList.toggle('active');
        checkNext();
    };
};