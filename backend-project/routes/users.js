const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { requireAdmin } = require('../middleware/auth');

// GET all users (admin)
router.get('/', requireAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT u.UserID, u.UserName, u.EmployeeID, e.FirstName, e.LastName
       FROM mk_user u JOIN mk_employees e ON u.EmployeeID = e.EmployeeID
       WHERE e.Position != 'admin'`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create user (admin creates user for an employee)
router.post('/', requireAdmin, async (req, res) => {
  const { EmployeeID, UserName, Password } = req.body;
  if (!EmployeeID || !UserName || !Password) {
    return res.status(400).json({ message: 'EmployeeID, UserName and Password are required.' });
  }
  try {
    // Check if username already exists
    const [existing] = await db.query(`SELECT UserID FROM mk_user WHERE UserName = ?`, [UserName]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Username already taken.' });
    }
    const hashed = await bcrypt.hash(Password, 10);
    const [result] = await db.query(
      `INSERT INTO mk_user (EmployeeID, UserName, Password) VALUES (?, ?, ?)`,
      [EmployeeID, UserName, hashed]
    );
    res.status(201).json({ message: 'User created successfully.', id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE user
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await db.query(`DELETE FROM mk_user WHERE UserID=?`, [req.params.id]);
    res.json({ message: 'User deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
