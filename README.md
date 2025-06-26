# WorkLynx Server – Freelance Task Marketplace 🖥️

This is the **backend API** of the **WorkLynx** Freelance Task Marketplace project. It handles task data management, CRUD operations, and communication with the MongoDB database.

---

## 🚀 Live Server

🌐 **Server URL:** [https://worklynx-server.vercel.app](https://worklynx-server.vercel.app)

---

## 📦 Tech Stack

- **Node.js** – Runtime environment  
- **Express.js** – Server framework  
- **MongoDB** – NoSQL database  
- **dotenv** – To manage environment variables  
- **cors** – For handling cross-origin requests

---

## 🔧 Features

- 🌐 RESTful API for task management  
- 📄 CRUD operations: Add, update, delete, and get tasks  
- 🧑‍💻 User-specific data retrieval via query params  
- ⚙️ Environment-secure setup using `.env`  
- 🧹 Clean and modular route handling  
- 🌍 CORS configured for frontend communication

---

## 📁 Folder Structure (suggested)

---

---

## 📜 API Endpoints

| Method | Endpoint                        | Description                          |
|--------|----------------------------------|--------------------------------------|
| GET    | `/tasks`                        | Get all tasks                        |
| GET    | `/tasks/:id`                    | Get a single task by ID              |
| GET    | `/tasks/my-posted-tasks?email=` | Get tasks posted by a specific user  |
| POST   | `/tasks`                        | Add a new task                       |
| PUT    | `/tasks/:id`                    | Update a task                        |
| DELETE | `/tasks/:id`                    | Delete a task                        |

> ⚠️ Protected routes are managed on the client-side with Firebase auth.

---

## 🔐 Environment Variables

Create a `.env` file in the root of your project:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<your-mongo-user>:<password>@cluster.mongodb.net/worklynx
---
🧪 Getting Started Locally
1. Clone the Repo

git clone https://github.com/your-username/work-lynx-server.git
cd work-lynx-server

2. Install Dependencies

npm install express mongodb dotenv cors

3. Run the Server

# For development
npm run dev

# For production
npm start
---

⚠️ Important Notes
Make sure MongoDB URI is correct and the cluster is whitelisted for your IP.

This backend is deployed using Vercel or Render for serverless hosting.

You must connect this with the frontend's Firebase-auth protected routes.
---
📜 License
This project is built for educational and assignment purposes under the Programming Hero web development course.

---

🙋‍♀️ Author
Sanjida Rimi
📧 sanjidarimi023@gmail.com
