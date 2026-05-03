# 🎯 One Million Checkboxes

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2+-blue?logo=express)](https://expressjs.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8+-black?logo=socket.io)](https://socket.io/)
[![Redis](https://img.shields.io/badge/Redis-Latest-red?logo=redis)](https://redis.io/)
[![License](https://img.shields.io/badge/License-ISC-blue)](#license)

A real-time collaborative checkbox application where users can toggle checkboxes and see changes instantly across all connected clients. Built with modern web technologies for a seamless user experience.

[🌐 Live Demo](#deployment) • [📖 Documentation](#documentation) • [🚀 Quick Start](#quick-start)

</div>

---

## ✨ Features

- 🎯 **100 Interactive Checkboxes** - Toggle checkboxes in real-time
- 🔄 **Real-time Synchronization** - Changes broadcast instantly to all users via WebSocket
- 🔐 **OAuth Authentication** - Secure user authentication
- 💾 **Persistent State** - All checkbox states saved in Redis
- ⚡ **Fast & Scalable** - Built with Express.js and Socket.IO
- 🌍 **Multi-user Support** - Multiple users can interact simultaneously
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ☁️ **Cloud Ready** - Easily deploy to Render with online Redis

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **Socket.IO** | Real-time bidirectional communication |
| **Redis/Upstash** | In-memory data store & pub/sub |
| **ioredis** | Redis client |
| **JWT** | Token-based authentication |
| **dotenv** | Environment variable management |

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Redis** (for local development) - [Download](https://redis.io/download)
- **Git** - [Download](https://git-scm.com/)
- **GitHub Account** (for deployment)

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/one-million-checkboxes.git
cd one-million-checkboxes
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
CLIENT_ID=your_oauth_client_id
CLIENT_SECRET=your_oauth_client_secret
PORT=5000
REDIS_URL=redis://localhost:6379
NODE_ENV=development
```

### 4️⃣ Run Redis Locally (if not using Docker)

```bash
# On Windows (with WSL or Docker)
redis-server

# Or using Docker
docker-compose up -d
```

### 5️⃣ Start the Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:5000**

---

## 📁 Project Structure

```
one-million-checkboxes/
├── index.js                 # Main server file
├── redis.js                 # Redis client configuration
├── socket.js                # WebSocket event handlers
├── package.json             # Dependencies
├── Procfile                 # Render deployment config
├── docker-compose.yml       # Docker configuration
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
└── public/                  # Static files
    ├── index.html           # Main UI
    ├── login.html           # Login page
    └── callback.html        # OAuth callback
```

---

## 🔌 API Endpoints

### REST API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check endpoint |
| `GET` | `/checkboxes` | Get current checkbox states |
| `POST` | `/authenticate` | OAuth authentication |

### WebSocket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `client:checkbox-toggle` | Client → Server | User toggles a checkbox |
| `server:checkbox-response` | Server → Client | Broadcast checkbox state change |

---

## 🔧 Configuration

**Made with ❤️ by Your Name**

[⬆ Back to Top](#-one-million-checkboxes)

</div>
