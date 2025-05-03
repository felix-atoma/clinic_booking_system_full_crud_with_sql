const express = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/servicesController');
const router = express.Router();

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: List of services
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - fee
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               fee:
 *                 type: number
 *     responses:
 *       201:
 *         description: Service created
 */
router.post(
  '/',
  [
    body('name').notEmpty(),
    body('description').notEmpty(),
    body('fee').isFloat({ gt: 0 })
  ],
  controller.create
);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Update a service fee
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fee:
 *                 type: number
 *     responses:
 *       200:
 *         description: Service updated
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Delete a service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Service ID
 *     responses:
 *       200:
 *         description: Service deleted
 */
router.delete('/:id', controller.remove);

module.exports = router;
