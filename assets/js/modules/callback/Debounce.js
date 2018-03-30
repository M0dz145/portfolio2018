export default function debounce(callback, delay) {
    let timer;
    return function() {
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => callback.apply(this, args), delay)
    }
}