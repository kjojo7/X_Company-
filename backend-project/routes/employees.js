const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { requireAdmin } = require('../middleware/auth');

// GET all employees
router.get('/', requireAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT e.*, p.PostName 
       FROM mk_employees e 
       LEFT JOIN mk_post p ON e.PostID = p.PostID
       ORDER BY e.EmployeeID DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single employee
router.get('/:id', requireAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT e.*, p.PostName 
       FROM mk_employees e 
       LEFT JOIN mk_post p ON e.PostID = p.PostID
       WHERE e.EmployeeID = ?`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Employee not found.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create employee
router.post('/', requireAdmin, async (req, res) => {
  const { PostID, FirstName, LastName, Gender, DateOfBirth, Email, PhoneNumber, Position, HireDate, Salary, Status, Department, Address } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO mk_employees (PostID, FirstName, LastName, Gender, DateOfBirth, Email, PhoneNumber, Position, HireDate, Salary, Status, Department, Address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [PostID || null, FirstName, LastName, Gender, DateOfBirth, Email, PhoneNumber, Position, HireDate, Salary, Status, Department, Address]
    );
    res.status(201).json({ message: 'Employee created.', id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update employee
router.put('/:id', requireAdmin, async (req, res) => {
  const { PostID, FirstName, LastName, Gender, DateOfBirth, Email, PhoneNumber, Position, HireDate, Salary, Status, Department, Address } = req.body;
  try {
    await db.query(
      `UPDATE mk_employees SET PostID=?, FirstName=?, LastName=?, Gender=?, DateOfBirth=?, Email=?, PhoneNumber=?, Position=?, HireDate=?, Salary=?, Status=?, Department=?, Address=?
       WHERE EmployeeID=?`,
      [PostID || null, FirstName, LastName, Gender, DateOfBirth, Email, PhoneNumber, Position, HireDate, Salary, Status, Department, Address, req.params.id]
    );
    res.json({ message: 'Employee updated.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE employee
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await db.query(`DELETE FROM mk_user WHERE EmployeeID = ?`, [req.params.id]);
    await db.query(`DELETE FROM mk_employees WHERE EmployeeID = ?`, [req.params.id]);
    res.json({ message: 'Employee deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
