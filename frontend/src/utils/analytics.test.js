// frontend/src/utils/analytics.test.js
import ReactGA from 'react-ga4';
import { initGA, trackPageView, trackEvent, trackCustomEvent } from './analytics';

// Mock the react-ga4 library
jest.mock('react-ga4');

describe('Analytics Utils', () => {
  beforeEach(() => {
    // Clear all mock implementations before each test
    jest.clearAllMocks();
    // Reset environment variables
    delete process.env.REACT_APP_GA4_MEASUREMENT_ID;
    // Reset console methods
    console.log = jest.fn();
    console.warn = jest.fn();
  });

  describe('initGA', () => {
    it('should initialize GA4 with the correct Measurement ID', () => {
      process.env.REACT_APP_GA4_MEASUREMENT_ID = 'G-TEST123';
      initGA();
      expect(ReactGA.initialize).toHaveBeenCalledWith('G-TEST123');
      expect(console.log).toHaveBeenCalledWith('GA4 Initialized with ID:', 'G-TEST123');
    });

    it('should not initialize GA4 if ID is not provided', () => {
      delete process.env.REACT_APP_GA4_MEASUREMENT_ID;
      initGA();
      expect(ReactGA.initialize).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith('GA4 Measurement ID not found or is placeholder. Analytics is disabled.');
    });

    it('should not initialize GA4 if ID is placeholder', () => {
      process.env.REACT_APP_GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';
      initGA();
      expect(ReactGA.initialize).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith('GA4 Measurement ID not found or is placeholder. Analytics is disabled.');
    });
  });

  describe('trackPageView', () => {
    it('should track a page view if GA is initialized', () => {
      ReactGA.isInitialized = true;
      trackPageView('/home');
      expect(ReactGA.send).toHaveBeenCalledWith({
        hitType: 'pageview',
        page: '/home',
      });
      expect(console.log).toHaveBeenCalledWith('GA4 Page view tracked:', '/home');
    });

    it('should not track a page view if GA is not initialized', () => {
      ReactGA.isInitialized = false;
      trackPageView('/home');
      expect(ReactGA.send).not.toHaveBeenCalled();
    });
  });

  describe('trackEvent', () => {
    it('should track an event if GA is initialized', () => {
      ReactGA.isInitialized = true;
      trackEvent('engagement', 'click', 'header-button');
      expect(ReactGA.event).toHaveBeenCalledWith({
        category: 'engagement',
        action: 'click',
        label: 'header-button',
      });
      expect(console.log).toHaveBeenCalledWith('GA4 Event tracked:', {
        category: 'engagement',
        action: 'click',
        label: 'header-button'
      });
    });

    it('should not track an event if GA is not initialized', () => {
      ReactGA.isInitialized = false;
      trackEvent('engagement', 'click', 'header-button');
      expect(ReactGA.event).not.toHaveBeenCalled();
    });
  });

  describe('trackCustomEvent', () => {
    it('should track a custom event with parameters if GA is initialized', () => {
      ReactGA.isInitialized = true;
      const parameters = { utm_source: 'google', utm_campaign: 'summer_sale' };
      trackCustomEvent('campaign_click', parameters);
      expect(ReactGA.gtag).toHaveBeenCalledWith('event', 'campaign_click', parameters);
      expect(console.log).toHaveBeenCalledWith('GA4 Custom event tracked:', 'campaign_click', parameters);
    });

    it('should not track a custom event if GA is not initialized', () => {
      ReactGA.isInitialized = false;
      trackCustomEvent('campaign_click', { utm_source: 'google' });
      expect(ReactGA.gtag).not.toHaveBeenCalled();
    });

    it('should track a custom event with empty parameters', () => {
      ReactGA.isInitialized = true;
      trackCustomEvent('button_click');
      expect(ReactGA.gtag).toHaveBeenCalledWith('event', 'button_click', {});
    });
  });
});