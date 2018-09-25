export default class ServiceWorkerRegister {
    constructor() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then(() => console.info("Service Worker Registered"));
        }
    }
}