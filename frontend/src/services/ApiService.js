/**
 * Service for making API requests to the backend
 */

// Base URL for API requests - should be set in environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://chx5akj1ag.execute-api.us-east-2.amazonaws.com/v1';

/**
 * Create a new interview
 * @param {Object} options - Optional parameters for the interview
 * @param {string} options.role - The role for the interview (default: 'backend')
 * @param {string} options.seniority - The seniority level (default: 'junior')
 * @returns {Promise<Object>} The created interview data
 */
export const createInterview = async (options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/interviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create interview');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating interview:', error);
    throw error;
  }
};