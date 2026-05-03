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

### Environment Variables

```env
# OAuth Configuration
CLIENT_ID=your_oauth_client_id
CLIENT_SECRET=your_oauth_client_secret

# Server Configuration
PORT=5000
NODE_ENV=development

# Redis Configuration (Local)
REDIS_URL=redis://localhost:6379

# Redis Configuration (Production - Upstash)
REDIS_URL=rediss://default:password@host:port
```

### Docker Compose

The project includes a Docker Compose setup for local development:

```bash
# Start Redis container
docker-compose up -d

# Stop Redis container
docker-compose down
```

---

## 🌐 Deployment on Render

### Prerequisites for Deployment

1. ✅ Code pushed to GitHub
2. ✅ Upstash Redis database created
3. ✅ Environment variables configured

### Step-by-Step Deployment

#### Step 1: Create Upstash Redis Database

1. Visit [https://upstash.com](https://upstash.com)
2. Sign up with GitHub
3. Click **"Create Database"** → **"Redis"**
4. Select your preferred region (Asia-Singapore recommended)
5. Copy the **Redis URL** (format: `rediss://default:password@host:port`)

#### Step 2: Push Code to GitHub

```bash
git add .
git commit -m "Deploy: Configure for Render deployment"
git push origin main
```

#### Step 3: Create Web Service on Render

1. Visit [https://render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `one-million-checkboxes`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
5. Click **"Advanced"** and add Environment Variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `CLIENT_ID` | Your OAuth Client ID |
| `CLIENT_SECRET` | Your OAuth Client Secret |
| `REDIS_URL` | Your Upstash Redis URL |
| `PORT` | `5000` |

6. Click **"Create Web Service"**
7. Wait 5-10 minutes for deployment to complete

#### Step 4: Test Your Deployment

Once deployed:

```bash
# Test health endpoint
curl https://your-app-name.onrender.com/health

# Visit your app
https://your-app-name.onrender.com
```

### Deployment Checklist

- [ ] Upstash Redis database created
- [ ] Environment variables added to Render
- [ ] Code pushed to GitHub
- [ ] Web service created on Render
- [ ] Deployment completed successfully
- [ ] Health endpoint responds with `{ healthy: true }`

---

## 🐛 Troubleshooting

### Redis Connection Error

**Problem:** `Error: connect ECONNREFUSED 127.0.0.1:6379`

**Solution:**
- Make sure Redis is running locally: `redis-server`
- Or use Docker: `docker-compose up -d`
- For production: Check `REDIS_URL` environment variable

### Socket.IO Connection Failed

**Problem:** WebSocket connection timeouts

**Solution:**
- Check firewall settings
- Ensure `NODE_ENV=production` on Render
- Verify WebSocket is not blocked by proxy

### Authentication Issues

**Problem:** OAuth authentication fails

**Solution:**
- Verify `CLIENT_ID` and `CLIENT_SECRET` are correct
- Check redirect URI is whitelisted in OAuth provider
- Ensure environment variables are set in Render

---

## 📊 Performance Tips

- ✅ Redis is optimized for real-time operations
- ✅ Socket.IO uses efficient message broadcasting
- ✅ Checkbox state is compressed to minimize bandwidth
- ✅ Rate limiting prevents abuse (configurable in socket.js)

---

## 🔒 Security Considerations

- 🔐 Uses JWT for token validation
- 🔒 Environment variables for sensitive data
- 🛡️ Rate limiting on checkbox updates
- 📡 HTTPS required for production (automatic on Render)

---

## 📝 Local Development Workflow

1. Clone the repository
2. Install dependencies: `npm install`
3. Start Redis: `docker-compose up -d`
4. Create `.env` file from `.env.example`
5. Run dev server: `npm run dev`
6. Open http://localhost:5000

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Commands

```bash
# Install dependencies
npm install

# Run development server with auto-reload
npm run dev

# Start Redis (Docker)
docker-compose up -d

# Stop Redis (Docker)
docker-compose down
```

---

## 📄 License

This project is licensed under the **ISC License** - see the [package.json](package.json) file for details.

---

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [Socket.IO Guide](https://socket.io/docs/)
- [Redis Documentation](https://redis.io/documentation)
- [Render Deployment Guide](https://render.com/docs)
- [Upstash Redis Guide](https://upstash.com/docs)

---

## 📞 Support & Feedback

If you encounter any issues or have suggestions:

- 🐛 Open an [Issue](https://github.com/yourusername/one-million-checkboxes/issues)
- 💬 Start a [Discussion](https://github.com/yourusername/one-million-checkboxes/discussions)
- 📧 Contact: [your-email@example.com]

---

<div align="center">

**Made with ❤️ by Your Name**

[⬆ Back to Top](#-one-million-checkboxes)

</div>
