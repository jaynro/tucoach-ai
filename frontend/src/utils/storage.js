/**
 * Utility functions for working with local storage
 */

const PREFIX = 'tucoach_';

/**
 * Set an item in local storage
 * @param {string} key - The key to store the value under
 * @param {any} value - The value to store
 */
export const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(`${PREFIX}${key}`, serializedValue);
  } catch (error) {
    console.error(`Error setting localStorage item ${key}:`, error);
  }
};

/**
 * Get an item from local storage
 * @param {string} key - The key to retrieve
 * @param {any} defaultValue - The default value to return if the key doesn't exist
 * @returns {any} The stored value or the default value
 */
export const getItem = (key, defaultValue = null) => {
  try {
    const serializedValue = localStorage.getItem(`${PREFIX}${key}`);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error(`Error getting localStorage item ${key}:`, error);
    return defaultValue;
  }
};

/**
 * Remove an item from local storage
 * @param {string} key - The key to remove
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(`${PREFIX}${key}`);
  } catch (error) {
    console.error(`Error removing localStorage item ${key}:`, error);
  }
};

/**
 * Clear all items from local storage that start with the prefix
 */
export const clearAll = () => {
  try {
    Object.keys(localStorage)
      .filter(key => key.startsWith(PREFIX))
      .forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

/**
 * Store the interview ID in local storage
 * @param {string} interviewId - The interview ID to store
 */
export const storeInterviewId = (interviewId) => {
  setItem('interview_id', interviewId);
};

/**
 * Get the stored interview ID from local storage
 * @returns {string|null} The stored interview ID or null
 */
export const getInterviewId = () => {
  return getItem('interview_id');
};