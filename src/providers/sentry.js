import * as Sentry from "@sentry/vue";

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN ?? "";

function init (app, router) {
    if (import.meta.env.DEV) {
        console.log('running in dev mode, sentry is disabled');
        return;
    }

    Sentry.init({
        app,
        dsn: SENTRY_DSN,
        integrations: [
            new Sentry.BrowserTracing({
                routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            }),
            new Sentry.Replay(),
        ],
        // Performance Monitoring
        tracesSampleRate: 0.1, // Capture 100% of the transactions, reduce in production!
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    })
}

export default { init };