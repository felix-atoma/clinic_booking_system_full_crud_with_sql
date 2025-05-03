const express = require('express');
const app = express();
require('dotenv').config();
const setupSwagger = require('./swagger');

// Import routes
const appointmentsRoutes = require('./routes/appointmentsRoutes');
const patientsRoutes = require('./routes/patientsRoutes');
const doctorsRoutes = require('./routes/doctorsRoutes');
const servicesRoutes = require('./routes/servicesRoutes');

// Middleware to parse JSON
app.use(express.json());

// Route definitions
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/patients', patientsRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/services', servicesRoutes);

// Swagger documentation setup
setupSwagger(app);

// Default home route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to Clinic Booking API');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
