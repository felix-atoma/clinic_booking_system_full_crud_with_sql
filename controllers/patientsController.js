const { validationResult } = require('express-validator');
const db = require('../models/db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM patients', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.create = (req, res) => {
  // ✅ Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { full_name, email, phone, gender, date_of_birth } = req.body;
  const query = 'INSERT INTO patients (full_name, email, phone, gender, date_of_birth) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [full_name, email, phone, gender, date_of_birth], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { phone } = req.body;
  db.query('UPDATE patients SET phone = ? WHERE patient_id = ?', [phone, id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ updated: results.affectedRows });
  });
};

exports.remove = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM patients WHERE patient_id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ deleted: results.affectedRows });
  });
};
