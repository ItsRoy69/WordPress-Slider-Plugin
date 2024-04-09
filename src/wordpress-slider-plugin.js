import {
    store as blockEditorStore,
    ButtonBlockAppender,
    useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useRefEffect } from '@wordpress/compose';
import { select, subscribe } from '@wordpress/data';
import { memo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { SwiperInit } from './swiper-init';
import {
    ALLOWED_BLOCKS,
    DEFAULT_BLOCK,
    DEFAULT_BLOCK_ATTRIBUTES,
    DEFAULT_INNERBLOCK,
    DEFAULT_INNERBLOCK_ATTRIBUTES,
    PLACEHOLDER_IMG_1,
    PLACEHOLDER_IMG_2,
    PLACEHOLDER_IMG_3,
} from './constants';

export const Slider = memo(({ clientId, attributes }) => {
    const sliderRef = useRefEffect((element) => {
        const options = {
            ...attributes,
            ...{
                autoplay: false,
                grabCursor: false,
                simulateTouch: false,
            },
        };

        let slider = SwiperInit(element, options);
        let slideOrder = select(blockEditorStore).getBlockOrder(clientId);

        const unsubscribeSliderUpdateListener = subscribe(() => {
            const currentSlidesOrder =
                select(blockEditorStore).getBlockOrder(clientId);

            if (currentSlidesOrder.toString() !== slideOrder.toString()) {
                const selectedBlock =
                    select(blockEditorStore).getSelectedBlock();
                const slideAdded =
                    currentSlidesOrder.length > slideOrder.length;
                const slideRemoved =
                    currentSlidesOrder.length < slideOrder.length;
                const slideMoved =
                    currentSlidesOrder.length === slideOrder.length;
                const activeIndex = slider.activeIndex;

                slideOrder = currentSlidesOrder;
                slider.destroy();

                window.requestAnimationFrame(() => {

                    slider = SwiperInit(element, options);

                    let slideToIndex = activeIndex;
                    if (slideAdded) {
                        slideToIndex = slideOrder.length;
                    } else if (slideRemoved) {
                        slideToIndex = activeIndex - 1;
                    } else if (slideMoved) {
                        slideToIndex = slideOrder.findIndex(
                            (clientId) => clientId === selectedBlock.clientId
                        );
                    }

                    if (slideToIndex < 0) {
                        slideToIndex = 0;
                    }

                    slider.slideTo(slideToIndex, 0);
                });
            }
        });

        return () => {
            unsubscribeSliderUpdateListener();
            slider.destroy();
        };
    });

    const innerBlocksProps = useInnerBlocksProps(
        { className: 'swiper-wrapper' },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            defaultBlock: {
                name: DEFAULT_BLOCK,
                attributes: {
                    url: `${PLACEHOLDER_IMG_3}`,
                    ...DEFAULT_BLOCK_ATTRIBUTES,
                },
            },
            directInsert: true,
            orientation: 'horizontal',
            template: [
                [
                    DEFAULT_BLOCK,
                    {
                        url: `${PLACEHOLDER_IMG_1}`,
                        ...DEFAULT_BLOCK_ATTRIBUTES,
                    },
                    [
                        [
                            DEFAULT_INNERBLOCK,
                            {
                                placeholder: __('Slide title…', 'wpe'),
                                ...DEFAULT_INNERBLOCK_ATTRIBUTES,
                            },
                        ],
                    ],
                ],
                [
                    DEFAULT_BLOCK,
                    {
                        url: `${PLACEHOLDER_IMG_2}`,
                        ...DEFAULT_BLOCK_ATTRIBUTES,
                    },
                    [
                        [
                            DEFAULT_INNERBLOCK,
                            {
                                placeholder: __('Slide title…', 'wpe'),
                                ...DEFAULT_INNERBLOCK_ATTRIBUTES,
                            },
                        ],
                    ],
                ],
            ],
            renderAppender: false,
            templateInsertUpdatesSelection: true,
        }
    );

    return (
        <>
            <div className="swiper" ref={sliderRef}>
                <div {...innerBlocksProps} />
            </div>

            <ButtonBlockAppender
                className="slider-appender has-icon"
                rootClientId={clientId}
            />
        </>
    );
});