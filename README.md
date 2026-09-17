# 🔐 Members Only Club

A full‑stack web application where users can register, log in, create posts, and join a private club using a secret code. Club members can see post authors, while admins have the ability to delete any post.

---

## 🚀 Tech Stack

Backend
- Node.js
- Express.js
- PostgreSQL
- Passport.js (authentication)
- bcrypt (password hashing)
- EJS (templating)

Frontend
- HTML5
- CSS3 (responsive, custom styling)

Tools
- Git & GitHub
- Nodemon
- pg (PostgreSQL client)

---

## 📋 Features

- User registration — with password confirmation and bcrypt hashing
- Login / Logout — session‑based authentication via Passport.js
- Create posts — only authenticated users can publish
- Private club membership — enter a secret code to become a member
- Member‑only visibility — only members see post authors and dates
- Admin privileges — admins can delete any post
- Role‑based content — guests, members, and admins see different views
- Responsive UI — works on desktop, tablet, and mobile

---

## 🗄️ Database Schema

The application uses a PostgreSQL database with two tables:

**users**
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| first_name | VARCHAR(50) | User's first name |
| last_name | VARCHAR(50) | User's last name |
| username | VARCHAR(50) | Unique login |
| password_hash | VARCHAR(255) | bcrypt hash |
| membership | BOOLEAN | Club member status |
| is_admin | BOOLEAN | Admin privileges |
| created_at | TIMESTAMP | Registration date |

**posts**
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| user_id | INTEGER | Foreign key → users.id |
| title | VARCHAR(200) | Post title |
| content | TEXT | Post body |
| created_at | TIMESTAMP | Creation date |

---

## 🛠️ Installation

`bash
# Clone the repository
git clone https://github.com/your-username/members-only.git

# Navigate to the project folder
cd members-only

# Install dependencies
npm install

# Set up PostgreSQL
# Create a database named 'members_db'
# Update db/pool.js with your credentials

# Start the server
npm run dev

https://github.com/Te-AmWeB/members-only/blob/main/Lobby.png

https://github.com/Te-AmWeB/members-only/blob/main/VIP%20Lobby.png

https://github.com/Te-AmWeB/members-only/blob/main/Register.png

https://github.com/Te-AmWeB/members-only/blob/main/Login.png

Backend https://github.com/Te-AmWeB

Fronted https://github.com/Stack-zzz
