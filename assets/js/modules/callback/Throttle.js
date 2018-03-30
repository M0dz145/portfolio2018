export default function throttle(callback, delay) {
    let last,
        timer;

    return function() {
        const now  = +new Date(),
              args = arguments;

        if(last && now < last + delay) {
            // Le délai n'est pas écoulé on reset le timer
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                callback.apply(this, args);
            }, delay);
        } else {
            last = now;
            callback.apply(this, args);
        }
    };
}