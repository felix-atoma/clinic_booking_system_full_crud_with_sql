# Clinic Booking System

## Description
This is a simple full-stack clinic booking system that includes:
- A MySQL database schema
- Node.js + Express REST API for appointments

## Setup

1. **Install dependencies**
```bash
npm install
```

2. **Start the server**
```bash
node app.js
```

3. **Database**
- Import `clinic_system.sql` into your MySQL server
- Update `models/db.js` with your credentials

## Endpoints
- GET `/api/appointments` - List all appointments
- POST `/api/appointments` - Create a new appointment
- PUT `/api/appointments/:id` - Update appointment status
- DELETE `/api/appointments/:id` - Remove an appointment