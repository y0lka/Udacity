registerServiceWorker = () => {
    if (navigator.serviceWorker) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js', {}).then(function (registration) {
                // let serviceWorker;
                // if (registration.installing) {
                //     serviceWorker = registration.installing;
                // } else if (registration.waiting) {
                //     serviceWorker = registration.waiting;
                // } else if (registration.active) {
                //     serviceWorker = registration.active;
                // }
                // if (serviceWorker) {
                //     // logState(serviceWorker.state);
                //     serviceWorker.addEventListener('statechange', function (e) {
                //         // logState(e.target.state);
                //     });
                // }
            }).catch (function (error) {
                console.warn(`There service worker couldn't be registered. It failed with the following error: ${error}`);
            });
        });
    } else {
        // The current browser doesn't support service workers.
    }
};

registerServiceWorker();