export default class ServiceWorkerRegister {
    constructor() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    console.info("Service Worker Registered");

                    if(process.env.NODE_ENV === 'development') {
                        registration.unregister().then(() => console.log(`Service Worker Unregistered on 'development' mode`));
                    }
                });
        }
    }
}