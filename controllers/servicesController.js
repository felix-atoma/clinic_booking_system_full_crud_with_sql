const db = require('../models/db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM services', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.create = (req, res) => {
  const { name, description, fee } = req.body;
  db.query(
    'INSERT INTO services (name, description, fee) VALUES (?, ?, ?)',
    [name, description, fee],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: results.insertId });
    }
  );
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { fee } = req.body;
  db.query('UPDATE services SET fee = ? WHERE service_id = ?', [fee, id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ updated: results.affectedRows });
  });
};

exports.remove = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM services WHERE service_id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ deleted: results.affectedRows });
  });
};