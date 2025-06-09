
# Auth Demo

A simple Express.js authentication demo using MongoDB, Mongoose, bcrypt for password hashing, and express-session for session management. Users can register, log in, access a protected “secret” page, and log out.

## Table of Contents

- [Features](#features)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Configuration](#configuration)  
- [Running the App](#running-the-app)  
- [Project Structure](#project-structure)  
- [Routes](#routes)  
- [License](#license)  

---

## Features

- **Registration** with hashed passwords via [bcrypt](https://www.npmjs.com/package/bcrypt).
- **Login** with form-based authentication.
- **Session-based** user sessions using [express-session](https://www.npmjs.com/package/express-session).
- **Protected route** that only logged-in users can access.
- **Logout** support to destroy the session.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v14+  
- [MongoDB](https://www.mongodb.com/) (running locally or remotely)

---

## Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/auth-demo.git
   cd auth-demo
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

---

## Configuration

mongoose.connect('mongodb://127.0.0.1:27017/Auth-demo')
...
app.use(session({ secret: 'this is no longer a secrete', resave: false, saveUninitialized: false }))

Auth-demo -> db name
users -> collection


## Running the App

```bash
npm start
```

By default, the server runs on **http://localhost:3333/**.

---

## Project Structure

```
.
├── models
│   └── user.js        # Mongoose user schema + static validation method
├── views
│   ├── login.ejs
│   ├── register.ejs
│   └── secret.ejs
├── app.js             # Main Express application
├── package.json
└── README.md
```

---

## Routes

| Method | Path       | Description                                          | Access           |
| ------ | ---------- | ---------------------------------------------------- | ---------------- |
| GET    | `/`        | Home page (public)                                   | Public           |
| GET    | `/register`| Show registration form                               | Public           |
| POST   | `/register`| Process registration, hash password, start session   | Public           |
| GET    | `/login`   | Show login form                                      | Public           |
| POST   | `/login`   | Process login, validate credentials, start session   | Public           |
| GET    | `/secret`  | Protected page – only accessible when logged in      | **Protected**    |
| POST   | `/logout`  | Destroy session and redirect to login                | **Protected**    |

### Middleware: `requireLogin`

```js
const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }
  next();
};
```

Add `requireLogin` to any route you want to protect:
```js
app.get('/secret', requireLogin, (req, res) => {
  res.render('secret');
});
```

---

## License

This project is licensed under the MIT License. Feel free to use and modify as you like!
