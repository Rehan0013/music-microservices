🎵 Music Microservices Architecture
===================================

A distributed, event-driven backend system for a music streaming application built using **Node.js, Express, MongoDB, Redis, RabbitMQ, Docker, and Socket.IO**.

This project demonstrates real-world microservices architecture patterns including service isolation, asynchronous messaging, caching, OAuth authentication, and real-time communication.

* * *

🚀 Architecture Overview
------------------------

This system follows an **event-driven microservices architecture**.

### Core Services

*   **Auth Service** → Handles authentication, authorization, and user management.
*   **Music Service** → Manages tracks, playlists, and real-time playback events.
*   **Notification Service** → Consumes events and sends emails (OTP, welcome emails, etc.).

### Infrastructure Components

*   **MongoDB** → Separate database per service.
*   **Redis** → Caching layer for performance optimization.
*   **RabbitMQ** → Asynchronous inter-service communication.
*   **Docker & Docker Compose** → Containerized deployment.

* * *

🧠 Why This Architecture?
-------------------------

This project demonstrates:

*   Service isolation
*   Independent scaling capability
*   Event-driven communication
*   Loose coupling between services
*   Caching for performance optimization
*   Real-time communication using WebSockets
*   Production-style containerized setup

It is designed as a learning-focused but production-inspired backend system.

* * *

📦 Project Structure
--------------------

undefined

* * *

🔐 Auth Service
---------------

Handles:

*   User registration
*   Login
*   Google OAuth authentication
*   JWT issuance
*   Role-based access control

**Tech Stack:**

*   Express
*   MongoDB
*   Redis
*   RabbitMQ
*   Passport.js
*   JWT

* * *

🎶 Music Service
----------------

Handles:

*   Track upload
*   Track retrieval
*   Playlist management
*   Artist role validation
*   Real-time playback synchronization

**Tech Stack:**

*   Express
*   MongoDB
*   Redis
*   RabbitMQ
*   Socket.IO
*   ImageKit (media storage)

* * *

📧 Notification Service
-----------------------

Handles:

*   Welcome emails
*   OTP emails
*   Event-driven notifications

Consumes events from RabbitMQ and processes them asynchronously.

**Tech Stack:**

*   Express
*   RabbitMQ
*   Nodemailer

* * *

🔄 Service Communication
------------------------

| Communication Type | Technology Used | Purpose |
| --- | --- | --- |
| REST API | Express | Client → Service communication |
| Message Queue | RabbitMQ | Service → Service async communication |
| Real-time Events | Socket.IO | Simultaneous listening sync |
| Caching | Redis | Improve performance |
| Auth | JWT + OAuth | Secure access |

* * *

⚙️ Environment Variables
------------------------

Configuration is handled via environment variables.

### Auth Service

| Variable | Description |
| --- | --- |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `CLIENT_ID` | Google OAuth Client ID |
| `CLIENT_SECRET` | Google OAuth Client Secret |

### Music Service

| Variable | Description |
| --- | --- |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT verification |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit Public Key |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit Private Key |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL Endpoint |

### Notification Service

| Variable | Description |
| --- | --- |
| `EMAIL_USER` | Email sender address |
| `CLIENT_ID` | Gmail OAuth Client ID |
| `CLIENT_SECRET` | Gmail OAuth Client Secret |
| `REFRESH_TOKEN` | Gmail OAuth Refresh Token |

* * *

🐳 Running With Docker (Recommended)
------------------------------------

Make sure Docker and Docker Compose are installed.

undefined

### Services will run at:

*   Auth Service → [http://localhost:4000](http://localhost:4000)
*   Music Service → [http://localhost:4001](http://localhost:4001)
*   Notification Service → [http://localhost:4002](http://localhost:4002)
*   RabbitMQ Dashboard → [http://localhost:15672](http://localhost:15672)  
    (User: guest | Password: guest)

* * *

💻 Running Locally (Without Docker)
-----------------------------------

1.  Start MongoDB, Redis, and RabbitMQ manually.
2.  Navigate into each service directory.
3.  Install dependencies:

undefined

4.  Run development server:

undefined

* * *

📡 API Endpoints
----------------

### Auth Service (`/api/auth`)

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/register` | Register new user |
| POST | `/login` | Login user |
| GET | `/google` | Google OAuth login |

* * *

### Music Service (`/api/music`)

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/get` | Get music tracks (requires auth) |
| POST | `/create` | Upload track (artist role required) |

* * *

⚡ Real-Time Features
--------------------

The Music Service uses **Socket.IO** for simultaneous listening.

*   Connect to: `http://localhost:4001`
*   Events:
    *   `play`
    *   `pause`

This allows synchronized playback across multiple users.

* * *

🔥 Key Features
---------------

*   JWT Authentication
*   Google OAuth Integration
*   Role-Based Access Control
*   Redis Caching
*   Event-Driven Email Notifications
*   Real-Time Playback Sync
*   Dockerized Multi-Service Deployment
*   Asynchronous Messaging with RabbitMQ

* * *

📈 Scalability Potential
------------------------

This architecture allows:

*   Independent service scaling
*   Horizontal container scaling
*   Message-based event processing
*   Performance optimization via caching
*   Easy transition to Kubernetes

* * *

🛠 Future Improvements
----------------------

*   API Gateway integration
*   Service discovery
*   Centralized logging (ELK stack)
*   Rate limiting
*   CI/CD pipeline
*   Kubernetes deployment
*   Distributed tracing (OpenTelemetry)

* * *

🎯 Learning Outcomes
--------------------

This project demonstrates:

*   Microservices design patterns
*   Event-driven architecture
*   Authentication & OAuth flows
*   Caching strategies
*   Docker container orchestration
*   Real-time systems using WebSockets
*   Asynchronous job processing

* * *

📄 License
----------

MIT License.
