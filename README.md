# MERN Admin Dashboard

A full-stack **MERN (MongoDB, Express, React, Node.js)** application with Docker support.

---

## 📂 Project Structure

```
src/
├── backend/       # Node.js + Express API
│   ├── config/        # Database & app config
│   ├── controller/    # Business logic
│   ├── middlewares/   # Custom Express middlewares
│   ├── models/        # Mongoose models
│   ├── Routes/        # Express routes
│   ├── utils/         # Helper functions
│   ├── .env           # Backend environment variables
│   ├── Dockerfile     # Backend Docker setup
│   └── Server.js      # App entry point
│
├── frontend/      # React.js (served via Nginx)
│   ├── public/        # Static assets
│   ├── src/           # React source code
│   ├── .env           # Frontend environment variables
│   ├── nginx.conf     # Nginx config for React
│   └── Dockerfile     # Frontend Docker setup
│
├── docker-compose.yml # Orchestrates backend + frontend + DB
└── .gitignore
```

---

## ⚙️ Environment Variables

Each service has its own `.env` file:

* **Backend (`src/backend/.env`)**

```env
PORT=3000
MONGO_URI= youruri
JWT_SECRET= yourkey
```

* **Frontend (`src/frontend/.env`)**

```env
REACT_APP_BACKEND_URL=http://localhost:3000
```

---

## 🚀 Running with Docker

### Build and start containers (detached):

```bash
docker-compose up --build -d
```

### View logs:

```bash
docker-compose logs -f
```

### Stop and remove containers:

```bash
docker-compose down
```

### Rebuild specific service:

```bash
docker-compose build backend
```

Open your browser:

* Frontend → [http://localhost:3002](http://localhost:3002)
* Backend → [http://localhost:3000](http://localhost:3000)

---

## 🖥️ Running without Docker

### Backend

```bash
cd src/backend
npm install
npm start
```

Runs on → [http://localhost:3000](http://localhost:3000)

### Frontend

```bash
cd src/frontend
npm install
npm start
```

Runs on → [http://localhost:3000](http://localhost:3000) (React dev server)

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Nginx
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (via Mongoose)
* **Auth:** JWT (JSON Web Token)
* **Containerization:** Docker & Docker Compose
* **Package Management:** npm

---

## 📩 License

Created by Hariraghav.S

---

## 📬 Contact

[![Email](https://img.shields.io/badge/email-hariraghava21s@gmail.com-blue?style=flat&logo=gmail)](mailto:hariraghava21s@gmail.com)

---

## 🌐 Connect with Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Hariraghav.S-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/hariraghav962003/)

Happy Coding! 🎯
