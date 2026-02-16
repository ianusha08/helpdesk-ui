# Deployment Guide

This guide explains how to deploy the full-stack Helpdesk application.

## Prerequisites

-   GitHub account
-   [Render](https://render.com) account (for Backend)
-   [Netlify](https://netlify.com) account (for Frontend)

## 1. Backend Deployment (Render)

1.  **Push your code to GitHub**. Ensure the `server` folder is in your repository.
2.  Log in to **Render** and click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  **Configuration**:
    -   **Name**: `helpdesk-backend` (or similar)
    -   **Root Directory**: `server` (IMPORTANT)
    -   **Environment**: `Node`
    -   **Build Command**: `npm install`
    -   **Start Command**: `node index.js`
    -   **Data Center**: Choose one close to you.
5.  **Environment Variables**:
    Scroll down to "Environment Variables" and add:
    -   `PORT`: `10000` (Render creates this automatically, but good to be explicit)
    -   `FRONTEND_URL`: `https://YOUR-NETLIFY-SITE-NAME.netlify.app` (You will add this *after* deploying frontend, or use `*` temporarily)
6.  Click **Create Web Service**.
7.  Wait for deployment to finish. **Copy the backend URL** (e.g., `https://helpdesk-backend.onrender.com`).

## 2. Frontend Deployment (Netlify)

1.  Log in to **Netlify** and click **Add new site** -> **Import from existing project**.
2.  Connect your GitHub repository.
3.  **Configuration**:
    -   **Base directory**: `helpdesk-ui` (CRITICAL: Your project is inside a subfolder)
    -   **Build command**: `npm run build`
    -   **Publish directory**: `dist`
4.  **Environment Variables**:
    Click on **Advanced** or go to **Site settings > Environment variables** after creation.
    -   Key: `VITE_API_URL`
    -   Value: `https://helpdesk-backend.onrender.com/api` (Paste the Render URL you copied earlier, append `/api` if your backend routes require it - *Check `server/index.js`: routes are at `/api/tickets`, so Base URL should probably be `.../api/tickets` or adjust frontend code.*)
        -   **Correction**: In `src/lib/api.ts`, we use `baseURL`. If you set `VITE_API_URL` to `.../api/tickets`, then requests to `/` become `.../api/tickets/`.
        -   **Value to set**: `https://helpdesk-backend.onrender.com/api/tickets`
5.  Click **Deploy**.

## 3. Final Connection

1.  Once Frontend is deployed, copy its URL (e.g., `https://my-helpdesk.netlify.app`).
2.  Go back to **Render Dashboard** -> **Environment**.
3.  Update `FRONTEND_URL` to your Netlify URL (remove trailing slash).
4.  Render will restart the service.

## Local Development

To run locally:

1.  **Backend**:
    ```bash
    cd server
    npm run dev
    ```
    Runs on `http://localhost:5000`.

2.  **Frontend**:
    ```bash
    # In root/frontend directory
    npm run dev
    ```
    Reads `VITE_API_URL` from `.env`.
