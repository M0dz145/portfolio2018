export default class ServiceWorkerRegister {
    private readonly filePath: string = '/service-worker.js';

    constructor() {
        if ('serviceWorker' in navigator) {
            this.register();
        }
    }

    /**
     * Register the service worker.
     */
    private register(): void {
        navigator.serviceWorker.register(this.filePath)
            .then(this.onRegisterSuccess)
            .catch(this.onRegistrationFailed);
    }

    /**
     * When the service worker is registered successfully.
     * @param serviceWorkerRegistration
     */
    private onRegisterSuccess(serviceWorkerRegistration: ServiceWorkerRegistration): void {
        // registration worked
        console.info('Service Worker Registration succeeded. Scope is ' + serviceWorkerRegistration.scope);

        // updatefound is fired if service-worker.js changes.
        serviceWorkerRegistration.onupdatefound = () => this.onUpdateFound(serviceWorkerRegistration);
    }

    /**
     * On service worker registration failed.
     * @param error
     */
    private onRegistrationFailed(error: any): void {
        console.error(`Service Worker Registration failed with ${error}.`);
    }

    /**
     * On new update found.
     * @param serviceWorkerRegistration
     */
    private onUpdateFound(serviceWorkerRegistration: ServiceWorkerRegistration): void {
        // The updatefound event implies that serviceWorkerRegistration.installing is set; see
        // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
        const installingWorker = serviceWorkerRegistration.installing;

        installingWorker.onstatechange = () => this.onStateChange(installingWorker, serviceWorkerRegistration);
    }

    /**
     * When the state of the service worker changed.
     * @param installingWorker
     * @param serviceWorkerRegistration
     */
    private onStateChange(installingWorker: ServiceWorker, serviceWorkerRegistration: ServiceWorkerRegistration): void {
        switch (installingWorker.state) {
            case 'installed':
                if (!navigator.serviceWorker.controller) {
                    // At this point, everything has been precached.
                    // It's the perfect time to display a "Content is cached for offline use." message.
                    console.info('Content is now available offline!');
                    break;
                }

                // At this point, the old content will have been purged and the fresh content will
                // have been added to the cache.
                // It's the perfect time to display a "New content is available; please refresh."
                // message in the page's interface.
                // This is also a nice place to put major/minor version logic to inform the user of new features
                console.info('New or updated content is available.');

                // Unregister service worker and reload page
                serviceWorkerRegistration.unregister().then(this.unregisterSuccess.bind(this));
                return;

            case 'redundant':
                console.error('The installing service worker became redundant.');
                break;
        }
    }

    /**
     * When we want to unregister the service worker.
     */
    private unregisterSuccess(): void {
        // Clear cache files
        caches.keys().then(keys => {
            keys.forEach(key => caches.delete(key));
            console.info('Cache files cleared.');

            // Reload application
            window.location.reload(true);
        });
    }
}
