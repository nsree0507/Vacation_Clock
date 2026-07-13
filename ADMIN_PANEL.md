# VACATION CLOCK - ADMIN PANEL IMPLEMENTATION

Complete admin panel system with authentication, dashboard, and CRUD functionality for managing destinations, states, itineraries, bookings, and users.

## ✨ Features

### Admin Authentication
- **Email/Password Login** - Secure admin authentication with JWT tokens
- **Session Management** - Persistent authentication with token storage
- **Protected Routes** - All admin routes require valid authentication

### Dashboard
- **Statistics Cards** - Real-time counts for states, destinations, bookings, and users
- **Recent Bookings** - Display latest booking activities
- **Recent Destinations** - Show newly added destinations

### Admin Functions

#### 🗺️ Destinations Management
- Add new destinations with details (name, state, category, description, image, rating, price)
- Edit existing destination information
- Delete destinations
- Search and filter by category/state
- Automatic updates to Explore, Packages, and Places pages

#### 🏞️ States Management
- Add states with comprehensive details
- Edit state information (name, description, famous places, best time to visit, food & culture, images)
- Delete states
- Manage multiple images and famous places per state
- Updates reflect in India Map and state pages

#### 📦 Itineraries Management
- Create travel packages with day-wise plans
- Edit package details
- Delete itineraries
- Manage pricing and duration
- Updates synchronized with itinerary and package detail pages

#### 📅 Bookings Management
- View all bookings in a comprehensive table
- Search bookings by ID, customer name, or email
- Update booking status (pending, confirmed, cancelled)
- Real-time status updates with visual indicators

#### 👥 Users Management
- View all registered users with booking counts
- Block/Unblock user accounts
- Delete user accounts
- Search users by name or email
- User activity tracking

## 🏗️ Project Structure

```
vacation-clock-website/
├── src/
│   ├── pages/
│   │   └── admin/
│   │       ├── AdminLogin.jsx          # Login page
│   │       ├── Dashboard.jsx            # Dashboard with statistics
│   │       ├── Destinations.jsx         # Manage destinations
│   │       ├── States.jsx               # Manage states
│   │       ├── Itineraries.jsx          # Manage itineraries
│   │       ├── Bookings.jsx             # View and manage bookings
│   │       └── Users.jsx                # Manage users
│   │
│   ├── components/
│   │   └── admin/
│   │       ├── AdminNavbar.jsx          # Top navigation bar
│   │       ├── Sidebar.jsx              # Left sidebar navigation
│   │       └── ProtectedRoute.jsx       # Route protection component
│   │
│   ├── services/
│   │   ├── adminApi.js                  # Admin auth & dashboard API
│   │   ├── destinationApi.js            # Destinations API
│   │   ├── stateApi.js                  # States API
│   │   ├── itineraryApi.js              # Itineraries API
│   │   ├── bookingApi.js                # Bookings API
│   │   └── userApi.js                   # Users API
│   │
│   └── App.jsx                          # Updated with admin routes
│
└── backend/
    ├── models/
    │   ├── Admin.js                     # Admin schema with password hashing
    │   ├── Destination.js               # Destination schema
    │   ├── State.js                     # State schema
    │   ├── Itinerary.js                 # Itinerary schema
    │   ├── Booking.js                   # Booking schema (existing)
    │   └── User.js                      # User schema
    │
    ├── controllers/
    │   ├── adminController.js           # Login & dashboard logic
    │   ├── destinationController.js      # Destination CRUD
    │   ├── stateController.js            # State CRUD
    │   ├── itineraryController.js        # Itinerary CRUD
    │   ├── bookingController.js          # Booking management (updated)
    │   └── userController.js             # User management
    │
    ├── routes/
    │   ├── adminRoutes.js                # Admin auth routes
    │   ├── destinationRoutes.js          # Destination CRUD routes
    │   ├── stateRoutes.js                # State CRUD routes
    │   ├── itineraryRoutes.js            # Itinerary CRUD routes
    │   ├── bookingRoutes.js              # Booking routes (updated)
    │   └── userRoutes.js                 # User routes
    │
    ├── middleware/
    │   ├── authMiddleware.js             # JWT authentication
    │   └── adminMiddleware.js            # Admin role verification
    │
    └── server.js                         # Updated with new routes
```

## 🚀 Getting Started

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Ensure MongoDB is Running**
   ```bash
   # On Windows (if using MongoDB Community)
   mongod
   ```

3. **Configure Environment Variables**
   ```
   # .env file
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/vacation-clock
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   REACT_APP_API_URL=https://vacation-clock-6oij.onrender.com/api
   ```

### Running the Application

**Terminal 1 - Frontend (Development Server)**
```bash
npm run dev
```

**Terminal 2 - Backend (API Server)**
```bash
npm run backend
```

Access the admin panel at: `http://localhost:5173/admin/login`

## 📝 API Endpoints

### Admin Routes
- **POST** `/api/admin/login` - Admin login with email and password
- **GET** `/api/admin/dashboard` - Get dashboard statistics and recent data

### Destination Routes
- **GET** `/api/destinations` - Get all destinations (public)
- **GET** `/api/destinations/:id` - Get single destination
- **POST** `/api/destinations` - Create destination (admin only)
- **PUT** `/api/destinations/:id` - Update destination (admin only)
- **DELETE** `/api/destinations/:id` - Delete destination (admin only)

### State Routes
- **GET** `/api/states` - Get all states (public)
- **GET** `/api/states/:id` - Get single state
- **POST** `/api/states` - Create state (admin only)
- **PUT** `/api/states/:id` - Update state (admin only)
- **DELETE** `/api/states/:id` - Delete state (admin only)

### Itinerary Routes
- **GET** `/api/itineraries` - Get all itineraries (public)
- **GET** `/api/itineraries/:id` - Get single itinerary
- **POST** `/api/itineraries` - Create itinerary (admin only)
- **PUT** `/api/itineraries/:id` - Update itinerary (admin only)
- **DELETE** `/api/itineraries/:id` - Delete itinerary (admin only)

### Booking Routes
- **GET** `/api/bookings` - Get all bookings (admin only)
- **GET** `/api/bookings/:id` - Get single booking (admin only)
- **PUT** `/api/bookings/:id/status` - Update booking status (admin only)

### User Routes
- **GET** `/api/users` - Get all users (admin only)
- **GET** `/api/users/:id` - Get single user (admin only)
- **PUT** `/api/users/:id/block` - Block/unblock user (admin only)
- **DELETE** `/api/users/:id` - Delete user (admin only)

## 🔐 Authentication

### JWT Token
- Tokens are stored in `localStorage` as `adminToken`
- Tokens expire after 24 hours
- All admin routes check for valid token in Authorization header

### Admin Credentials (Demo)
```
Email: admin@example.com
Password: admin123
```

**Important:** Change these credentials in production!

## 🎨 UI/UX Features

- **Responsive Design** - Works on mobile, tablet, and desktop
- **Modern Dashboard** - Clean, intuitive interface with Tailwind CSS
- **Loading States** - Smooth loading indicators for async operations
- **Error Handling** - User-friendly error messages
- **Confirmation Dialogs** - Prevent accidental deletions
- **Success Messages** - Toast-like notifications for actions
- **Real-time Search** - Filter data instantly
- **Data Tables** - Sortable, searchable tables with pagination

## 🔄 Data Synchronization

All admin changes automatically update across the website:

- **Destination Updates** → Explore Page, Packages Page, Places Page
- **State Updates** → India Map, State Pages, Explore Section
- **Itinerary Updates** → Itinerary Page, Package Details, Dynamic Pages
- **Booking Updates** → User bookings, Payment status
- **User Updates** → User profiles, Access control

## 📊 Database Models

### Admin Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: 'admin', 'superadmin'),
  createdAt: Date,
  updatedAt: Date
}
```

### Destination Model
```javascript
{
  name: String,
  state: String,
  category: String,
  description: String,
  imageUrl: String,
  rating: Number (0-5),
  price: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### State Model
```javascript
{
  name: String (unique),
  description: String,
  famousPlaces: [String],
  bestTimeToVisit: String,
  foodAndCulture: String,
  images: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Itinerary Model
```javascript
{
  packageName: String,
  destination: String,
  duration: Number,
  dayWisePlan: [{
    day: Number,
    title: String,
    description: String,
    activities: [String]
  }],
  price: Number,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Model (existing + updates)
```javascript
{
  bookingId: String (unique),
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  destinationName: String,
  packageName: String,
  travelDate: String,
  travelers: Number,
  totalAmount: Number,
  bookingStatus: String (enum: 'confirmed', 'pending', 'cancelled'),
  createdAt: Date,
  updatedAt: Date
}
```

### User Model
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  bookingCount: Number,
  isBlocked: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ Technologies Used

**Frontend:**
- React 19
- React Router v7
- Tailwind CSS 4
- Lucide React (Icons)
- Axios (HTTP Client)

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs (Password Hashing)
- CORS (Cross-Origin Resource Sharing)

## ⚠️ Important Notes

1. **JWT Secret**: Change `JWT_SECRET` in `.env` file for production
2. **MongoDB**: Ensure MongoDB is running before starting the backend
3. **CORS**: Update CORS settings in `server.js` for production URLs
4. **Admin Credentials**: Create new admin accounts in production
5. **Password Security**: Use strong passwords and never commit credentials
6. **Rate Limiting**: Consider implementing rate limiting for production
7. **Input Validation**: All inputs are validated on both frontend and backend
8. **SQL/NoSQL Injection**: Protected through Mongoose schema validation

## 📝 User-Facing Website Unchanged

- All existing user pages remain completely untouched
- Existing routing, styling, and functionality preserved
- Admin panel is completely isolated under `/admin` route
- No impact on booking flow, category flow, or user pages

## 🔗 Admin Routes Summary

| Route | Purpose |
|-------|---------|
| `/admin/login` | Admin login page |
| `/admin/dashboard` | Dashboard with statistics |
| `/admin/destinations` | Manage destinations |
| `/admin/states` | Manage states |
| `/admin/itineraries` | Manage itineraries |
| `/admin/bookings` | View and manage bookings |
| `/admin/users` | Manage user accounts |

## 🚨 Troubleshooting

**Backend not connecting to MongoDB:**
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in `.env` file
- Verify MongoDB is installed and configured

**Admin login failing:**
- Verify JWT_SECRET is set in `.env`
- Check admin user exists in database
- Review browser console for errors

**API calls failing:**
- Ensure backend is running: `npm run backend`
- Check REACT_APP_API_URL in `.env`
- Verify token is stored in localStorage

## 📞 Support

For issues or questions about the admin panel implementation, review the code structure and API documentation above.

---

**Admin Panel Implementation Complete** ✅
All routes, controllers, models, and components are fully implemented and ready to use.
