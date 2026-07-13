# Quick Start Guide - Booking System

## 🎯 Get Up and Running in 5 Minutes

### 1. Install MongoDB (Choose One)

**Option A: Local MongoDB** (Recommended for development)
1. Download from: https://www.mongodb.com/try/download/community
2. Install (default settings)
3. MongoDB starts automatically

**Option B: MongoDB Atlas** (Cloud - No installation)
1. Sign up at: https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vacation-bookings
   ```

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```
✅ Already done! All packages including Express, Mongoose, CORS installed.

### 3. Start Services (Two Terminals)

**Terminal 1 - Backend:**
```bash
npm run backend
```
Expected: `Booking server running on port 5000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Expected: `Local: http://localhost:5173`

### 4. Test Booking Flow
1. Open http://localhost:5173
2. Go to Explore → Pick a destination
3. Click "Book Now"
4. Fill form and submit
5. See booking confirmation with ID (BK-2025-XXXXX)

### 5. Verify It Works
- Booking shows confirmation ✅
- Booking ID displays (real or temporary) ✅
- Can navigate back to packages ✅

---

## 📡 API Test (Optional)

Using cURL or Postman:

```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test User",
    "customerEmail": "test@example.com",
    "customerPhone": "+91 98765 43210",
    "destinationName": "Goa",
    "packageName": "Beach Package",
    "travelDate": "2025-07-01",
    "travelers": 2,
    "totalAmount": 30000
  }'
```

Response should include `"bookingId": "BK-2025-XXXXX"`

---

## 🔍 Check What's Running

**Backend Health:**
```
http://localhost:5000/api/health
```
Should return: `{"status": "ok", "message": "Booking service is running"}`

**Frontend:**
```
http://localhost:5173
```
Should load the website normally

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Start `mongod` or check `.env` |
| Port 5000 in use | Change PORT in `.env` |
| Backend not responding | Check `npm run backend` is running |
| Booking shows temp ID | Backend might be down (expected behavior) |
| Build errors | Run `npm install --legacy-peer-deps` |

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `backend/server.js` | Express server |
| `backend/models/Booking.js` | MongoDB schema |
| `backend/controllers/bookingController.js` | Booking logic |
| `backend/routes/bookingRoutes.js` | API endpoints |
| `src/services/bookingService.js` | Frontend API client |
| `src/pages/BookingPage.jsx` | Booking form |
| `src/pages/BookingConfirmationPage.jsx` | Confirmation display |
| `.env` | Configuration |

---

## 📚 More Info

For detailed documentation:
- `backend/README.md` - Full backend setup & API docs
- `BOOKING_SYSTEM.md` - Complete implementation guide

---

## ✨ What Happens When You Book

1. **Form Submit** → Backend receives data
2. **Validation** → Checks required fields
3. **Booking ID Generated** → Format: BK-2025-XXXXX
4. **Saved to MongoDB** → Persisted
5. **Response Sent** → Frontend gets bookingId
6. **Confirmation Page** → Displays booking details
7. **Data Kept** → Can retrieve anytime

---

## 🎉 You're Ready!

Just run:
```bash
npm run backend
npm run dev
```

Then test booking a trip! 🚀
