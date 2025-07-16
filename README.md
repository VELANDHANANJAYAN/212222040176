## URL SHORTENER

# URL Shortener Microservice with Analytics

This is a full-stack URL Shortener application built with:

- **Backend**: Node.js (Express), JSON storage, custom logging middleware  
- **Frontend**: React (Vite) + Material UI v6 (Grid v2)  
- **Features**: Custom shortcodes, auto-expiry, redirection tracking, analytics dashboard

---

## Features

- Shorten long URLs with optional custom shortcode  
- Expiration control (default 30 min, customizable)  
- Analytics: total clicks, timestamp, referrer, location  
- No console logging — all requests logged via custom middleware  
- Frontend built with React, Vite, and Material UI

---

### Backend Setup

```bash
cd backend
npm install
node server.js

Server runs at: http://localhost:8000
```
## Frontend Setup

cd url-shortener-frontend
npm install
npm run dev

Frontend runs at: http://localhost:3000

API Endpoints
POST /shorturls
Create a short URL.

## Request Body

{
  "url": "https://example.com/...",
  "validity": 60,
  "shortcode": "custom123"
}
## Response

{
  "shortlink": "http://localhost:8000/custom123",
  "expiry": "2025-07-16T16:10:00.000Z"
}
GET /shorturls/:shortcode
View stats (clicks, location, etc.)

GET /:shortcode


## Project Structure

backend/
  ├── server.js
  ├── controllers/
  ├── middleware/
  └── data/urls.json

url-shortener-frontend/
  ├── src/components/
  ├── src/pages/
  └── App.jsx

## OUTPUT

Shorten URL :

<img width="1919" height="850" alt="Screenshot 2025-07-16 164340" src="https://github.com/user-attachments/assets/a3d9399d-2276-4b8e-a175-2dc9637df0e1" />

Stats Viewer : 

<img width="1919" height="848" alt="Screenshot 2025-07-16 164359" src="https://github.com/user-attachments/assets/034b43ea-52bc-4a31-a495-a9256fcfe2f9" />


