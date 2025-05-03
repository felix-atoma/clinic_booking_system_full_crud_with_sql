const express = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/doctorsController');
const router = express.Router();

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of doctors
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/doctors:
 *   post:
 *     summary: Create a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - specialization
 *               - email
 *               - phone
 *             properties:
 *               full_name:
 *                 type: string
 *               specialization:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Doctor created
 */
router.post(
  '/',
  [
    body('full_name').notEmpty(),
    body('specialization').notEmpty(),
    body('email').isEmail(),
    body('phone').notEmpty()
  ],
  controller.create
);

/**
 * @swagger
 * /api/doctors/{id}:
 *   put:
 *     summary: Update doctor phone
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Doctor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Doctor updated
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /api/doctors/{id}:
 *   delete:
 *     summary: Delete a doctor
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Doctor deleted
 */
router.delete('/:id', controller.remove);

module.exports = router;
