# Music Microservices Project

Welcome to the Music Microservices project! This repository contains a set of microservices for a music streaming application, built with Node.js, Express, MongoDB, RabbitMQ, and Redis.

## Project Structure

The project is divided into the following microservices:

*   **auth**: Handles user authentication (Register, Login, Google OAuth) and user management.
    *   Stack: Express, MongoDB, Redis, RabbitMQ, Passport.js
*   **music**: Manages music tracks, playlists, and streaming.
    *   Stack: Express, MongoDB, Redis, RabbitMQ, Socket.IO, ImageKit
*   **notification**: Handles sending emails (Welcome emails, OTPs) based on events from other services.
    *   Stack: Express, RabbitMQ, Nodemailer

## Prerequisites

*   [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
*   Node.js (for local development without Docker)

## Configuration

Crucial configuration is handled via environment variables.

**Note**: The `docker-compose.yml` file contains placeholders for sensitive keys (like Google OAuth and ImageKit credentials). You should replace these with your actual keys or use a `.env` file.

### Environment Variables

| Service | Variable | Description |
| :--- | :--- | :--- |
| **Auth** | `MONGO_URI` | MongoDB connection string |
| | `JWT_SECRET` | Secret key for JWT signing |
| | `CLIENT_ID` | Google OAuth Client ID |
| | `CLIENT_SECRET` | Google OAuth Client Secret |
| **Music** | `MONGO_URI` | MongoDB connection string |
| | `JWT_SECRET` | Secret key for JWT verifying |
| | `IMAGEKIT_PUBLIC_KEY` | ImageKit Public Key |
| | `IMAGEKIT_PRIVATE_KEY` | ImageKit Private Key |
| | `IMAGEKIT_URL_ENDPOINT` | ImageKit URL Endpoint |
| **Notification** | `EMAIL_USER` | Email address for sending notifications |
| | `CLIENT_ID`| OAuth Client ID for Gmail |
| | `CLIENT_SECRET` | OAuth Client Secret for Gmail |
| | `REFRESH_TOKEN` | OAuth Refresh Token for Gmail |

## Running the Application

### Using Docker Compose (Recommended)

To start all services (Auth, Music, Notification) along with the required infrastructure (MongoDB, Redis, RabbitMQ), simply run:

```bash
docker-compose up --build
```

Access the services at:
*   Auth Service: `http://localhost:4000`
*   Music Service: `http://localhost:4001`
*   Notification Service: `http://localhost:4002` (internal/worker)
*   RabbitMQ Management: `http://localhost:15672` (User: `guest`, Pass: `guest`)

### Local Development

1.  Start infrastructure (MongoDB, Redis, RabbitMQ) manually or via Docker.
2.  Navigate to each service directory (`auth`, `music`, `notification`).
3.  Install dependencies: `npm install`
4.  Run the service: `npm run dev`

## API Endpoints

### Auth Service (`/api/auth`)
*   `POST /register`: Register a new user
*   `POST /login`: Login
*   `GET /google`: Google OAuth Login

### Music Service (`/api/music`)
*   `GET /get`: Get music tracks (requires login)
*   `POST /create`: Upload music (requires artist role)

## Real-time Features
The **Music Service** uses Socket.IO for real-time features like simultaneous listening (Play/Pause events).
- Connect to `http://localhost:4001`
- Events: `play`, `pause`
