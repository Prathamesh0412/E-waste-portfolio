# E-Waste Management Academic Portfolio

A modern, full-stack academic portfolio built to showcase research, assignments, and knowledge regarding E-Waste Management. This project features a beautiful, responsive frontend for visitors and a secure backend admin dashboard for the portfolio owner to dynamically upload and manage their assignments.

## 🌟 Features

- **Beautiful UI/UX:** Designed with modern aesthetics, custom typography, and smooth animations using Framer Motion.
- **Dynamic Content:** Assignments are fetched from a backend database and rendered dynamically.
- **Admin Dashboard:** A secure, authenticated portal for the portfolio owner to manage content.
- **File Uploads:** Upload assignment thumbnail images and PDF documents directly through the admin panel.
- **Interactive Elements:** Features an interactive timeline, accordion-based case studies, and a built-in knowledge quiz.
- **Fully Responsive:** Optimized for mobile phones, tablets, and large desktop screens.

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS (Styling & Layout)
- Framer Motion (Animations)
- React Router (Navigation)
- Lucide React (Icons)

**Backend:**
- Node.js & Express
- SQLite (via `better-sqlite3` for fast, synchronous database operations)
- JSON Web Tokens (JWT) for secure admin authentication
- Multer (Local file uploads)

## 🚀 Getting Started (Local Development)

Follow these instructions to run the project locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/ewaste-portfolio.git
   cd ewaste-portfolio
   ```

2. Install all dependencies for both frontend and backend:
   ```bash
   npm install
   ```

3. Start the development server (runs both Vite and Express concurrently):
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   - **Frontend:** `http://localhost:5173`
   - **Admin Login:** `http://localhost:5173/admin/login`

### Admin Credentials (Local Testing)
- **Username:** `admin`
- **Password:** `admin@0412`

## 🌍 Deployment Guide

Because this application uses a local SQLite database (`database.sqlite`) and stores uploaded files locally (`public/uploads`), it **cannot** be deployed to serverless platforms like Vercel, Netlify, or GitHub Pages (as they use read-only filesystems that will delete your uploads).

**We recommend deploying on [Render.com](https://render.com/) using a Web Service with a Persistent Disk:**

1. Push your code to GitHub.
2. Sign up on Render and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the following configurations:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. **Crucial Step:** Before finishing, go to the **Disks** tab in Render and add a disk:
   - **Name:** `storage`
   - **Mount Path:** `/opt/render/project/src`
   - **Size:** 1 GB
6. Save and deploy!

## 📝 License

This project was built as an academic portfolio. Feel free to explore the code!
