const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

router.seedAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash('admin@123', 10);

    // Ensure the password column can hold a bcrypt hash
    await db.query(`ALTER TABLE mk_user MODIFY Password VARCHAR(255) NOT NULL`);

    // Seed default positions if they don't exist
    const postNames = ['Admin', 'Manager', 'HR Officer', 'Sales Representative', 'Accountant', 'Clerk', 'Intern'];  
    for (const postName of postNames) {
      const [existingPost] = await db.query(`SELECT PostID FROM mk_post WHERE PostName = ?`, [postName]);
      if (existingPost.length === 0) {
        await db.query(`INSERT INTO mk_post (PostName) VALUES (?)`, [postName]);
      }
    }

    const [rows] = await db.query(`SELECT * FROM mk_user WHERE UserName = 'admin'`);
    if (rows.length === 0) {
      // Get Admin post ID
      const [postRows] = await db.query(`SELECT PostID FROM mk_post WHERE PostName = 'Admin' LIMIT 1`);
      const adminPostId = postRows[0]?.PostID || 1;

      // Create a dummy employee for admin if not exists
      let employeeId = 1;
      const [empRows] = await db.query(
        `SELECT EmployeeID FROM mk_employees WHERE FirstName = 'Admin' AND LastName = 'User' LIMIT 1`
      );
      if (empRows.length === 0) {
        const [result] = await db.query(
          `INSERT INTO mk_employees (PostID, FirstName, LastName, Gender, DateOfBirth, Email, PhoneNumber, Position, HireDate, Salary, Status, Department, Address)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), ?, ?, ?, ?)`,
          [adminPostId, 'Admin', 'User', 'Other', '1990-01-01', 'admin@mkcars.com', '0000000000', 'Admin', 0, 'Active', 'Administration', 'HQ']
        );
        employeeId = result.insertId;
      } else {
        employeeId = empRows[0].EmployeeID;
      }
      await db.query(
        `INSERT INTO mk_user (EmployeeID, UserName, Password) VALUES (?, ?, ?)`,
        [employeeId, 'admin', hashedPassword]
      );
      console.log('✓ Admin credentials seeded: username=admin, password=admin@123');
    } else {
      await db.query(
        `UPDATE mk_user SET Password = ? WHERE UserName = 'admin'`,
        [hashedPassword]
      );
      console.log('✓ Admin user already exists. Password reset to default admin@123');
    }
  } catch (err) {
    console.error('Error seeding admin:', err);
  }
};

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }
  try {
    const [rows] = await db.query(
      `SELECT u.*, e.FirstName, e.LastName, e.Position 
       FROM mk_user u 
       JOIN mk_employees e ON u.EmployeeID = e.EmployeeID 
       WHERE u.UserName = ?`,
      [username]
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const role = user.Position && user.Position.toLowerCase() === 'admin' ? 'admin' : 'user';
    req.session.user = {
      userID: user.UserID,
      employeeID: user.EmployeeID,
      username: user.UserName,
      firstName: user.FirstName,
      lastName: user.LastName,
      role,
    };
    return res.json({
      message: 'Login successful',
      user: req.session.user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Could not log out.' });
    res.clearCookie('connect.sid');
    return res.json({ message: 'Logged out successfully.' });
  });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  if (req.session && req.session.user) {
    return res.json({ user: req.session.user });
  }
  return res.status(401).json({ message: 'Not authenticated.' });
});

module.exports = router;
