# 🚀 MALLBITE Deployment Guide

This guide details how to deploy **MALLBITE** to production across popular hosting platforms.

---

## ⚡ Quick Options Overview

| Platform | Best For | Time to Deploy | Cost |
| :--- | :--- | :--- | :--- |
| **[Vercel](#1-deploy-to-vercel-recommended)** | Serverless Fullstack (Zero config) | ~1 min | Free |
| **[Render](#2-deploy-to-render-single-web-service)** | Continuous Fullstack Node service | ~2 mins | Free |
| **[Railway](#3-deploy-to-railway)** | Fast Docker / Node deployment | ~1 min | Free trial |
| **[Docker](#4-docker-container-deployment)** | Self-hosted VPS (AWS / DigitalOcean) | Custom | Infrastructure cost |

---

## 1. Deploy to Vercel (Recommended)

Vercel hosts the React frontend on its global Edge Network and runs the backend Express API via Vercel Serverless Functions (`/api/*`).

### Method A: Via Vercel Web Dashboard (1-Click)
1. Push your latest code to GitHub:
   ```bash
   git add .
   git commit -m "Configure production deployment"
   git push origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and log in.
3. Import your GitHub repository: `ashu7yadav/MALLBITE`.
4. Keep the default settings:
   - **Framework Preset**: `Vite` (or `Other`)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `frontend/dist`
5. Click **Deploy**.
6. Once deployed, your app will be live at `https://your-project.vercel.app`!

### Method B: Via Vercel CLI
```bash
# Install Vercel CLI if needed
npm install -g vercel

# Deploy directly from the project root
vercel

# Deploy to production domain
vercel --prod
```

---

## 2. Deploy to Render (Single Web Service)

Render will build both the frontend and run the Node.js backend server, serving the static frontend from the same origin.

### Steps:
1. Go to [dashboard.render.com](https://dashboard.render.com) and click **New +** → **Web Service**.
2. Connect your GitHub repository `ashu7yadav/MALLBITE`.
3. Configure the settings:
   - **Name**: `mallbite`
   - **Environment**: `Node`
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
4. Add Environment Variables (optional):
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
5. Click **Create Web Service**.

*(Alternatively, use the included `render.yaml` Blueprint for 1-click infrastructure deployment).*

---

## 3. Deploy to Railway

1. Go to [railway.app](https://railway.app) and create a **New Project**.
2. Select **Deploy from GitHub repo** and pick `ashu7yadav/MALLBITE`.
3. Railway automatically detects `package.json` or `Dockerfile`.
4. Railway will run `npm run build` and `npm start` automatically.
5. Generate a public domain under service **Settings** → **Networking** → **Generate Domain**.

---

## 4. Docker Container Deployment

You can build and run the production container anywhere Docker is installed:

### Build and Run:
```bash
# Build Docker image
docker build -t mallbite:latest .

# Run container on port 5000
docker run -p 5000:5000 -e NODE_ENV=production mallbite:latest
```

Open `http://localhost:5000` in your browser to verify.

---

## 5. Local Production Test

Before pushing to production, you can test the production build locally:

```bash
# 1. Build the production assets
npm run build

# 2. Run the production server
npm start

# 3. Open http://localhost:5000 in your browser
```

---

## 🔧 Environment Variables Reference

| Variable | Required? | Description | Default |
| :--- | :--- | :--- | :--- |
| `PORT` | Optional | Port for Express server | `5000` |
| `NODE_ENV` | Optional | Set to `production` in live environments | `development` |
| `VITE_API_BASE_URL` | Optional | Custom backend API URL (only needed if frontend is hosted on a separate domain from backend) | `/api` |
