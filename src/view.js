import { SwiperInit } from './swiper-init';

document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.swiper');
    if (!containers.length) {
        return;
    }

    containers.forEach((element) => {
        let options = {};

        try {
            options = JSON.parse(element.dataset.swiper);
        } catch (e) {
            console.error(e);
            return;
        }

        // Slider 
        SwiperInit(element, options);
    });
});