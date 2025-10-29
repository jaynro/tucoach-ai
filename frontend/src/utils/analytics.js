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

/**
 * Sends a standardized event with AI usage metrics.
 * @param {Object} metrics - Usage metrics for the AI turn.
 * @param {string} metrics.interviewId - Identifier of the interview session.
 * @param {number} metrics.tokensIn - Prompt/input tokens for the turn.
 * @param {number} metrics.tokensOut - Completion/output tokens for the turn.
 * @param {number} metrics.totalTokens - Total tokens for the turn if provided.
 * @param {number} metrics.latencyMs - Latency in milliseconds for the turn.
 * @param {string} metrics.model - Model identifier.
 * @param {string} metrics.promptVersion - Prompt version tag.
 */
export const trackAiTurnUsage = ({
  interviewId,
  tokensIn,
  tokensOut,
  totalTokens,
  latencyMs,
  model,
  promptVersion,
} = {}) => {
  const payload = {
    interview_id: interviewId,
    tokens_in: tokensIn ?? 0,
    tokens_out: tokensOut ?? 0,
    total_tokens:
      totalTokens ??
      ((tokensIn ?? 0) + (tokensOut ?? 0)),
    latency_ms: latencyMs ?? 0,
    model,
    prompt_version: promptVersion,
  };

  trackCustomEvent('ai_turn_usage', payload);
};

/**
 * Tracks a Google Ads conversion event.
 * @param {string} conversionLabel - The conversion label from Google Ads (e.g., 'abc123def456')
 * @param {Object} options - Optional conversion parameters
 * @param {number} options.value - The conversion value
 * @param {string} options.currency - The currency