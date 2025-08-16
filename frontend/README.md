# TuCoach AI Frontend

This is the frontend application for TuCoach AI, a platform that provides AI-powered interview coaching.

## Features

- Real-time chat interface with AI interview coach 
- Modern UI with Tailwind CSS
- WebSocket communication with backend
- Responsive design
- Google Analytics 4 integration for user tracking

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```
   cd frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Development

To start the development server:

```
npm start
```

or

```
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the application for production:

```
npm run build
```

or

```
yarn build
```

This will create a `build` directory with optimized production files.

### Environment Variables

The application uses environment variables for configuration:

- `REACT_APP_WEBSOCKET_URL`: The WebSocket URL for connecting to the backend
- `REACT_APP_CLERK_PUBLISHABLE_KEY`: The publishable key for Clerk authentication
- `REACT_APP_GA4_MEASUREMENT_ID`: The Measurement ID for Google Analytics 4

For local development, these are set in `.env.development`. For production, they are set in `.env.production`.

## Google Analytics 4 Integration

The application includes GA4 integration to track user interactions and campaign performance:

- **Page Views**: Automatically tracked on route changes
- **UTM Parameters**: Automatically captured on first page load (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`)
- **Custom Events**: Track user interactions like button clicks and form submissions
- **Enhanced Measurement**: Enabled for better tracking of scrolls, downloads, and video engagement

### Testing Analytics

To test UTM parameter tracking:
1. Access the app with UTM parameters: `http://localhost:3000/?utm_source=test&utm_medium=cpc&utm_campaign=summer_sale`
2. Check browser developer tools > Network tab for requests to `google-analytics.com`
3. Verify in GA4 Realtime reports

## WebSocket Communication

The application communicates with the backend using WebSockets. The WebSocket URL is configured through the `REACT_APP_WEBSOCKET_URL` environment variable.

Messages sent to the WebSocket server should have the following format:

```json
{
  "action": "message",
  "message": "Your message here",
  "interview_id": "your-interview-id"
}
```

Responses from the server will have the following format:

```json
{
  "message": "Response message",
  "type": "response",
  "interview_id": "your-interview-id"
}
```

## Project Structure

- `public/`: Static files
- `src/`: Source code
  - `components/`: React components
  - `hooks/`: Custom React hooks
  - `context/`: React context providers
  - `utils/`: Utility functions including analytics
  - `App.js`: Main application component
  - `index.js`: Application entry point

## Learn More

To learn more about the technologies used in this project:
