import Pieces from './Pieces';
import Position from '@modules/event/Position';
import anime from 'animejs';
import RoundCursor from "@modules/animation/cursor/RoundCursor";

export default class PiecesSlider {
    constructor(canvas, images, texts) {
        // Get all images and texts, get the `canvas` element, and save slider length
        this.sliderCanvas = canvas;
        this.imagesEl = images;
        this.textEl = texts;
        this.slidesLength = this.imagesEl.length;

        // Define indexes related variables and functions
        this.currentIndex = 0;
        this.currentTextIndex = null;
        this.currentImageIndex = null;
        this.currentNumberIndex = null;

        this.updateIndexes();

        this.imageIndexes = [];
        this.textIndexes = [];
        this.numberIndexes = [];

        // Some other useful variables
        this.windowWidth = window.innerWidth;
        this.piecesSlider = null;

        // Options for images
        this.imageOptions = {
            angle: 45,
            extraSpacing: {extraX: 100, extraY: 200},
            piecesWidth: () => Pieces.random(50, 200),
            ty: () => Pieces.random(-400, 400)
        };

        // Options for texts
        this.textOptions = {
            color: 'black',
            fontSize: () => 24,
            padding: '15 20 10 20',
            angle: -45,
            piecesSpacing: 2,
            extraSpacing: {extraX: 0, extraY: 300},
            piecesWidth: () => Pieces.random(50, 200),
            ty: () => Pieces.random(-200, 200),
            translate: () => {
                if(this.windowWidth > 1120) {
                    return {translateX: 200, translateY: 200};
                }

                if(this.windowWidth > 720) {
                    return {translateX: 0, translateY: 200};
                }

                return {translateX: 0, translateY: 100};
            }
        };

        // Options for numbers
        this.numberOptions = {
            color: 'black',
            fontSize: () => 80,
            angle: 0,
            piecesSpacing: 2,
            extraSpacing: {extraX: 10, extraY: 10},
            piecesWidth: 35,
            ty: () => Pieces.random(-200, 200),
            translate: () => {
                if(this.windowWidth > 1120) {
                    return {translateX: -340, translateY: -180};
                }

                if(this.windowWidth > 720) {
                    return {translateX: -240, translateY: -180};
                }

                return {translateX: -140, translateY: -100};
            }
        };

        // Handle `resize` event
        this.initial = true;
        this.hideTimer = null;
        this.resizeTimer = null;

        // Build the array of items to draw using Pieces
        this.items = [];
        let imagesReady = 0;
        for(let i = 0; i < this.slidesLength; i++) {
            // Wait for all images to load before initializing the slider and event listeners
            const slideImage = new Image();
            slideImage.onload = () => {
                if(++imagesReady === this.slidesLength) {
                    this.initSlider();
                    this.initEvents();
                }
            };

            // Push all elements for each slide with the corresponding options
            this.items.push({type: 'image', value: this.imagesEl[i], options: this.imageOptions});
            this.items.push({type: 'text', value: this.textEl[i].innerText, options: this.textOptions});
            this.items.push({type: 'text', value: i + 1, options: this.numberOptions});

            // Save indexes
            this.imageIndexes.push(i * 3);
            this.textIndexes.push(i * 3 + 1);
            this.numberIndexes.push(i * 3 + 2);

            // Set image src
            slideImage.src = this.imagesEl[i].src;
        }
    }

    // Update current indexes for image, text and number
    updateIndexes() {
        this.currentImageIndex = this.currentIndex * 3;
        this.currentTextIndex = this.currentImageIndex + 1;
        this.currentNumberIndex = this.currentImageIndex + 2;
    }

    // Initialize a Pieces instance with all items we want to draw
    initSlider() {
        // Stop any current animation if the slider was initialized before
        if(this.piecesSlider) {
            this.piecesSlider.stop();
        }

        this.resizeCanvas();

        // Save the new Pieces instance
        this.piecesSlider = new Pieces({
            canvas: this.sliderCanvas,
            items: this.items,
            x: 'centerAll',
            y: 'centerAll',
            piecesSpacing: 1,
            fontFamily: ["'Aventura', sans-serif"],
            animation: {
                duration: () => Pieces.random(1000, 2000),
                easing: 'easeOutQuint'
            },
            // debug: true
        });

        // Animate all text to rotate clockwise indefinitely
        this.piecesSlider.animateItems({
            items: this.textIndexes,
            duration: 20000,
            angle: 360,
            loop: true
        });

        // Animate all numbers to rotate clockwise indefinitely
        this.piecesSlider.animateItems({
            items: this.numberIndexes,
            duration: 20000,
            angle: 360,
            loop: true
        });

        // Show current items: image, text and number
        this.showItems();
    }

    // Init Event Listeners
    initEvents() {
        this.resizeStart = this.resizeStart.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onKeydown = this.onKeydown.bind(this);

        window.addEventListener('keydown', this.onKeydown, true);
        window.addEventListener('resize', this.resizeStart, true);
        window.addEventListener('mousemove', this.onMouseMove, true);
    }

    // Destroy Event Listeners
    destroyEvents() {
        window.removeEventListener('keydown', this.onKeydown, true);
        window.removeEventListener('resize', this.resizeStart, true);
        window.removeEventListener('mousemove', this.onMouseMove, true);
    }

    // Select prev or next slide using arrow keys
    onKeydown(e) {
        if(e.keyCode === 37) { // left
            this.prevItem();
        } else if(e.keyCode === 39) { // right
            this.nextItem();
        }
    }

    onMouseMove(e) {
        const image = this.piecesSlider.getItems(this.imageIndexes[this.currentIndex]);

        if(Position.elementIsInEvent(e, image)) {
            if(!this.mouseIsHoverImage) {
                this.mouseIsHoverImage = true;
                this.itemShowAfterHoverImage = false;

                new RoundCursor().onMouseEnterClickableElement();

                this.piecesSlider.showPieces({
                    items: this.currentImageIndex,
                    ignore: ['tx'],
                    singly: true,
                    x: p => p.s_x * 1.2,
                    y: p => p.s_y * 1.2,
                    opacity: .7
                });
            }
        } else {
            this.mouseIsHoverImage = false;
            if(!this.itemShowAfterHoverImage) {
                this.itemShowAfterHoverImage = true;
                new RoundCursor().onMouseLeaveClickableElement();
                this.showItems();
            }
        }
    }

    // Show current items: image, text and number
    showItems() {
        // Show image pieces
        this.piecesSlider.showPieces({
            items: this.currentImageIndex,
            ignore: ['tx'],
            singly: true,
            opacity: 1,
            x: p => p.s_x * 1.03,
            y: p => p.s_y * 1.03,
            update: (anim) => {
                // Stop the pieces animation at 60%, and run a new indefinitely animation of `ty` for each piece
                if(anim.progress > 60) {
                    const piece = anim.animatables[0].target;
                    const ty = piece.ty;
                    anime.remove(piece);
                    anime({
                        targets: piece,
                        ty: piece.h_ty < 300
                            ? [
                                {value: ty + 10, duration: 1000},
                                {value: ty - 10, duration: 2000},
                                {value: ty, duration: 1000}
                            ]
                            : [
                                {value: ty - 10, duration: 1000},
                                {value: ty + 10, duration: 2000},
                                {value: ty, duration: 1000}
                            ],
                        duration: 2000,
                        easing: 'linear',
                        loop: true
                    });
                }
            }
        });

        // Show pieces for text and number, using alternate `ty` values
        this.piecesSlider.showPieces({
            items: this.currentTextIndex
        });

        this.piecesSlider.showPieces({
            items: this.currentNumberIndex,
            ty: (p, i) => p.s_ty - [-3, 3][i % 2]
        });
    }

    // Hide current items: image, text and number
    hideItems() {
        this.piecesSlider.hidePieces({
            items: [
                this.currentImageIndex,
                this.currentTextIndex,
                this.currentNumberIndex
            ]
        });
    }

    // Select the prev item: hide current items, update indexes, and show the new current item
    prevItem() {
        this.hideItems();
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.slidesLength - 1;
        this.updateIndexes();
        this.showItems();
    }

    // Select the next item: hide current items, update indexes, and show the new current item
    nextItem() {
        this.hideItems();
        this.currentIndex = this.currentIndex < this.slidesLength - 1 ? this.currentIndex + 1 : 0;
        this.updateIndexes();
        this.showItems();
    }

    resizeCanvas() {
        this.sliderCanvas.setAttribute('height', window.innerHeight - 150);
        this.sliderCanvas.setAttribute('width', window.innerWidth - 150);
    }

    // User starts resizing, so wait 300 ms before reinitialize the slider
    resizeStart() {
        if(this.initial) {
            this.initial = false;
            if(this.hideTimer) {
                clearTimeout(this.hideTimer);
            }

            this.sliderCanvas.classList.add('pieces-slider__canvas--hidden');
        }

        if(this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }

        this.resizeTimer = setTimeout(this.resizeEnd.bind(this), 300);
    }

    // User ends resizing, then reinitialize the slider
    resizeEnd() {
        this.initial = true;
        this.windowWidth = window.innerWidth;
        this.initSlider();

        this.hideTimer = setTimeout(() => this.sliderCanvas.classList.remove('pieces-slider__canvas--hidden'), 200);
    }
}
