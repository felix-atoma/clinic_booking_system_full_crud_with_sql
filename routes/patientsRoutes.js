const express = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/patientsController');
const router = express.Router();

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of patients
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - email
 *               - phone
 *               - gender
 *               - date_of_birth
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Patient created
 */
router.post(
  '/',
  [
    body('full_name').notEmpty(),
    body('email').isEmail(),
    body('phone').notEmpty(),
    body('gender').isIn(['Male', 'Female', 'Other']),
    body('date_of_birth').isDate()
  ],
  controller.create
);

module.exports = router;
