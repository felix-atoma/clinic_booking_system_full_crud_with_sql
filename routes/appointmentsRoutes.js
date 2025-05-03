const express = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/appointmentsController');
const router = express.Router();

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of appointments
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patient_id
 *               - doctor_id
 *               - service_id
 *               - appointment_date
 *             properties:
 *               patient_id:
 *                 type: integer
 *               doctor_id:
 *                 type: integer
 *               service_id:
 *                 type: integer
 *               appointment_date:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [Scheduled, Completed, Cancelled]
 *     responses:
 *       201:
 *         description: Appointment created
 */
router.post(
  '/',
  [
    body('patient_id').isInt(),
    body('doctor_id').isInt(),
    body('service_id').isInt(),
    body('appointment_date').isISO8601(),
    body('status').optional().isIn(['Scheduled', 'Completed', 'Cancelled'])
  ],
  controller.create
);

/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Update an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment updated
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment deleted
 */
router.delete('/:id', controller.remove);

module.exports = router;
