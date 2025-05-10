# TuCoach AI Frontend

This is the frontend application for TuCoach AI, a platform that provides AI-powered interview coaching.

## Features

- Real-time chat interface with AI interview coach
- WebSocket communication with backend
- Responsive design

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

For local development, these are set in `.env.development`. For production, they are set in `.env.production`.

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
  - `App.js`: Main application component
  - `index.js`: Application entry point

## Learn More

To learn more about the technologies used in this project:

- [React](https://reactjs.org/)
- [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)