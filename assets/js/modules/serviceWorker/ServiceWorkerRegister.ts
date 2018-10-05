export default class ServiceWorkerRegister {
    private readonly filePath: string = '/service-worker.js';

    constructor() {
        if ('serviceWorker' in navigator) {
            this.register()
                .then(reg => {
                    // registration worked
                    console.info('Service Worker Registration succeeded. Scope is ' + reg.scope);

                    // updatefound is fired if service-worker.js changes.
                    reg.onupdatefound = () => {
                        // The updatefound event implies that reg.installing is set; see
                        // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
                        const installingWorker = reg.installing;

                        installingWorker.onstatechange = () => {
                            switch (installingWorker.state) {
                                case 'installed':
                                    if (navigator.serviceWorker.controller) {
                                        // At this point, the old content will have been purged and the fresh content will
                                        // have been added to the cache.
                                        // It's the perfect time to display a "New content is available; please refresh."
                                        // message in the page's interface.
                                        // This is also a nice place to put major/minor version logic to inform the user of new features
                                        console.info('New or updated content is available.');

                                        // Unregister service worker and reload page
                                        reg.unregister().then(() => {
                                            // Clear cache files
                                            caches.keys().then(keys => {
                                                keys.forEach(key => caches.delete(key));
                                                console.info('Cache files cleared.');

                                                // Reload application
                                                window.location.reload(true);
                                            });
                                        });
                                    } else {
                                        // At this point, everything has been precached.
                                        // It's the perfect time to display a "Content is cached for offline use." message.
                                        console.info('Content is now available offline!');
                                    }
                                    break;

                                case 'redundant':
                                    console.error('The installing service worker became redundant.');
                                    break;
                            }
                        };
                    };
                })
                .catch(this.onRegistrationFailed);
        }
    }

    /**
     * Register the service worker
     */
    private register(): Promise<ServiceWorkerRegistration> {
        return navigator.serviceWorker.register(this.filePath);
    }

    /**
     * On service worker registration failed
     * @param error
     */
    private onRegistrationFailed(error: any): void {
        console.error(`Service Worker Registration failed with ${error}`);
    }
}