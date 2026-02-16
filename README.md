📌 User Management CRUD App

A full-stack User Management application built with:

⚛️ React (Vite)

🎨 Tailwind CSS

🗄️ JSON Server (Custom Express Wrapper)

🚀 Render (Backend Deployment)

▲ Vercel (Frontend Deployment)

## 🔗 Live Demo

Frontend:
https://crud-user-app-shidhesh.vercel.app

Backend API:
https://user-crud-api-7hir.onrender.com/users


📂 Project Structure
/backend     → JSON-server API (Node)
/frontend    → React + Tailwind app
README.md
package.json

🖥️ Local Development Setup
1️⃣ Install Dependencies

From root:

npm install
cd frontend && npm install
cd ../backend && npm install
cd ..

2️⃣ Run Backend (API)

From root:

npm run server


API will run at:

http://127.0.0.1:5000/users

3️⃣ Run Frontend

From root:

npm run dev


App runs at:

http://localhost:5173

🔁 API Endpoints

Base URL (Production):

https://your-render-url.onrender.com


Endpoints:

Method	Endpoint	Description
GET	/users	Get all users
POST	/users	Create new user
PUT	/users/:id	Update user
DELETE	/users/:id	Delete user
⚙️ Environment Variables

In production (Vercel), set:

VITE_API_BASE_URL=https://your-render-url.onrender.com


Locally, the app uses Vite proxy (/api) automatically.

🧠 Extensibility (Important Feature)

The form and table are config-driven.

To add a new field:

Edit:

frontend/src/config/userFields.config.js


Example:

{ name: "age", label: "Age", type: "number" }


No UI changes required — form and table update automatically.

🚀 Deployment
Backend (Render)

Deploy /backend folder

Start command:

npm start

Frontend (Vercel)

Root directory: /frontend

Build command:

npm run build


Output directory:

dist


Add environment variable in Vercel dashboard:

VITE_API_BASE_URL = https://your-render-url.onrender.com

⚠️ Notes About Render Free Tier

Free services spin down after inactivity.

First request after sleep may be slow.

Data persistence depends on container lifecycle.

🛠️ Features

Create / Read / Update / Delete users

Tailwind-styled responsive UI

Custom delete confirmation modal

Form validation

Clean monorepo structure

Production-ready architecture

👨‍💻 Author

Built as part of a full-stack assessment task.