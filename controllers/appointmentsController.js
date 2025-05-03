const db = require('../models/db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM appointments', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.create = (req, res) => {
  const { patient_id, doctor_id, service_id, appointment_date, status } = req.body;
  const query = 'INSERT INTO appointments (patient_id, doctor_id, service_id, appointment_date, status) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [patient_id, doctor_id, service_id, appointment_date, status], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.query('UPDATE appointments SET status = ? WHERE appointment_id = ?', [status, id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ updated: results.affectedRows });
  });
};

exports.remove = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM appointments WHERE appointment_id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ deleted: results.affectedRows });
  });
};