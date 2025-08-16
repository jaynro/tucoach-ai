// frontend/src/utils/analytics.js

import ReactGA from "react-ga4";

const GA4_MEASUREMENT_ID = process.env.REACT_APP_GA4_MEASUREMENT_ID;

/**
 * Initializes Google Analytics 4.
 * This should be called once when the application starts.
 */
export const initGA = () => {
  if (GA4_MEASUREMENT_ID && GA4_MEASUREMENT_ID !== "G-XXXXXXXXXX") {
    ReactGA.initialize(GA4_MEASUREMENT_ID);
    console.log("GA4 Initialized with ID:", GA4_MEASUREMENT_ID);
  } else {
    console.warn("GA4 Measurement ID not found or is placeholder. Analytics is disabled.");
  }
};

/**
 * Tracks a page view event.
 * @param {string} path - The path of the page to track (e.g., window.location.pathname).
 */
export const trackPageView = (path) => {
  if (ReactGA.isInitialized) {
    ReactGA.send({ hitType: "pageview", page: path });
    console.log("GA4 Page view tracked:", path);
  }
};

/**
 * Tracks a custom event.
 * @param {string} category - The category of the event.
 * @param {string} action - The action of the event.
 * @param {string} label - (Optional) A label for the event.
 */
export const trackEvent = (category, action, label) => {
  if (ReactGA.isInitialized) {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
    console.log("GA4 Event tracked:", { category, action, label });
  }
};

/**
 * Tracks a custom event with additional parameters.
 * Useful for tracking UTM parameters or other custom data.
 * @param {string} eventName - The name of the event.
 * @param {Object} parameters - Additional parameters for the event.
 */
export const trackCustomEvent = (eventName, parameters = {}) => {
  if (ReactGA.isInitialized) {
    ReactGA.gtag('event', eventName, parameters);
    console.log("GA4 Custom event tracked:", eventName, parameters);
  }
};