const db = require('../models/db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM doctors', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.create = (req, res) => {
  const { full_name, specialization, email, phone } = req.body;
  db.query(
    'INSERT INTO doctors (full_name, specialization, email, phone) VALUES (?, ?, ?, ?)',
    [full_name, specialization, email, phone],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: results.insertId });
    }
  );
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { phone } = req.body;
  db.query('UPDATE doctors SET phone = ? WHERE doctor_id = ?', [phone, id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ updated: results.affectedRows });
  });
};

exports.remove = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM doctors WHERE doctor_id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ deleted: results.affectedRows });
  });
};