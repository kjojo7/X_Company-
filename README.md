# MK Cars - Fleet & Employee Management System

A comprehensive full-stack web application for managing company car fleets, employee records, user accounts, and generating business reports. Built with modern technologies for efficiency and scalability.

## 🎯 Features

- **User Authentication** - Secure login system with session management and password encryption
- **Employee Management** - Complete CRUD operations for employee records with detailed information tracking
- **User Management** - Manage system users and their access permissions
- **Job Positions/Posts** - Track and manage different job positions within the organization
- **Reports & Analytics** - Generate and view business reports and analytics
- **Dashboard** - Central hub for viewing key business metrics and information
- **Responsive Design** - Modern UI built with React and Tailwind CSS

## 📋 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **Authentication:** bcryptjs, express-session
- **API Communication:** CORS-enabled REST API
- **Environment Management:** dotenv

### Frontend
- **UI Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Code Quality:** ESLint

## 📁 Project Structure

```
MK_CARS/
├── backend-project/           # Express API server
│   ├── config/
│   │   ├── db.js             # Database connection
│   │   └── mk_cars.sql       # Database schema
│   ├── middleware/
│   │   └── auth.js           # Authentication middleware
│   ├── routes/
│   │   ├── auth.js           # Authentication endpoints
│   │   ├── employees.js      # Employee management endpoints
│   │   ├── posts.js          # Job positions endpoints
│   │   ├── users.js          # User management endpoints
│   │   └── reports.js        # Reports endpoints
│   ├── server.js             # Main server file
│   ├── db.js                 # Database setup
│   └── package.json
│
├── front-end/                 # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Posts.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Users.jsx
│   │   ├── api.js            # API client setup
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   ├── App.css
│   │   └── index.css
│   ├── public/               # Static assets
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
│
└── package.json              # Root package configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL Server

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Kananura_Josh_MK_CARS_20261
   ```

2. **Setup Database**
   ```bash
   # Create MySQL database using the provided schema
   mysql -u root -p < backend-project/config/mk_cars.sql
   ```

3. **Backend Setup**
   ```bash
   cd backend-project
   npm install
   ```
   
   Create a `.env` file in the backend-project directory:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=mk_cars
   FRONTEND_URL=http://localhost:5173
   SESSION_SECRET=mk_cars_secret_2026
   ```

4. **Frontend Setup**
   ```bash
   cd ../front-end
   npm install
   ```

### Running the Application

#### Option 1: Run Both Servers
**Terminal 1 - Backend:**
```bash
cd backend-project
npm start          # Production mode
# or
npm run dev        # Development mode with nodemon
```

**Terminal 2 - Frontend:**
```bash
cd front-end
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

#### Option 2: Build for Production
```bash
# Backend (already production-ready)
cd backend-project
npm start

# Frontend (build static assets)
cd front-end
npm run build
npm run preview
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Job Positions/Posts
- `GET /api/posts` - Get all job positions
- `POST /api/posts` - Create new job position
- `PUT /api/posts/:id` - Update job position
- `DELETE /api/posts/:id` - Delete job position

### Reports
- `GET /api/reports` - Get all reports
- `POST /api/reports` - Generate new report
- `GET /api/reports/:id` - Get report by ID

## 🔐 Default Credentials

Upon startup, the system automatically creates a default admin account:
- **Username:** `admin`
- **Password:** `admin@123`

⚠️ **Important:** Change the default password immediately in production.

## 📊 Database Schema

### Tables
- **mk_post** - Job positions/posts
- **mk_employees** - Employee information and details
- **mk_user** - User accounts with credentials

The database is automatically seeded with default job positions:
- Admin
- Manager
- HR Officer
- Sales Representative
- Accountant
- Clerk
- Intern

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
PORT                  # Server port (default: 5000)
DB_HOST              # MySQL host (default: localhost)
DB_USER              # MySQL username (default: root)
DB_PASSWORD          # MySQL password
DB_NAME              # Database name (default: mk_cars)
FRONTEND_URL         # Frontend URL for CORS (default: http://localhost:3000)
SESSION_SECRET       # Session secret key
```

## 📦 Dependencies

### Backend
- `express` - Web framework
- `mysql2` - MySQL database driver
- `bcryptjs` - Password hashing
- `express-session` - Session management
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variables

### Frontend
- `react` - UI library
- `react-router-dom` - Client-side routing
- `axios` - HTTP client
- `tailwindcss` - CSS framework
- `vite` - Build tool

## 🧪 Development

### Linting
```bash
cd front-end
npm run lint
```

### Building
```bash
cd front-end
npm run build
```

## 📝 Notes

- Session timeout is set to 8 hours
- Passwords are hashed using bcryptjs for security
- CORS is enabled for frontend and backend communication
- All database timestamps are automatically managed
- Unique constraints ensure data integrity for emails, usernames, and post names

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure `mk_cars` database exists

### CORS Errors
- Verify `FRONTEND_URL` matches your frontend URL
- Check that backend is running on the correct port

### Port Already in Use
- Change the PORT in `.env` or use: `lsof -ti:5000 | xargs kill -9`

