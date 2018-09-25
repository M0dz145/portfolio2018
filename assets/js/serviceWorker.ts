class ApplicationServiceWorker {
    private cacheFiles: Array<string> = [
        '/',
        '/dist/app.js'
    ];

    constructor() {
        this.install();
    }

    private install(): void {
        self.addEventListener('install', e => {
            console.log(e);
            // @ts-ignore
            e.waitUntil(
                caches
                    .open('CXPortfolio')
                    .then(cache => {
                        console.log('cache files...');
                        cache.addAll(this.cacheFiles).then(() => console.log('Files cached'))
                    })
            );
        });

        self.addEventListener('fetch', event => {
            // @ts-ignore
            console.log(event.request.url);
            // @ts-ignore
            event.respondWith(
                // @ts-ignore
                caches.match(event.request).then(response => {
                    // @ts-ignore
                    return response || fetch(event.request);
                })
            );
        });
    }

    // public fetch(): void {
    //     if ('serviceWorker' in navigator) {
    //         navigator.serviceWorker
    //             .register('/build/serviceWorker.js')
    //             .then(() => console.info("Service Worker Registered"));
    //     }
    // }
}

new ApplicationServiceWorker();