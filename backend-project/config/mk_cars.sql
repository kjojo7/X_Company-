
CREATE DATABASE IF NOT EXISTS mk_cars;
USE mk_cars;


CREATE TABLE mk_post (
    PostID INT AUTO_INCREMENT PRIMARY KEY,
    PostName VARCHAR(40) NOT NULL,
    UNIQUE KEY unique_post_name (PostName)
);


CREATE TABLE mk_employees (
    EmployeeID INT AUTO_INCREMENT PRIMARY KEY,
    PostID INT,
    FirstName VARCHAR(40) NOT NULL,
    LastName VARCHAR(40) NOT NULL,
    Gender VARCHAR(20) NOT NULL,
    DateOfBirth DATE NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PhoneNumber VARCHAR(10) NOT NULL,
    Position VARCHAR(50) NOT NULL,
    HireDate DATE NOT NULL,
    Salary DECIMAL(10, 2) NOT NULL,
    Status VARCHAR(30) NOT NULL DEFAULT 'Active',
    Department VARCHAR(40) NOT NULL,
    Address VARCHAR(100) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (PostID) REFERENCES mk_post(PostID) ON DELETE SET NULL,
    INDEX idx_department (Department),
    INDEX idx_status (Status)
);

CREATE TABLE mk_user (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    EmployeeID INT NOT NULL UNIQUE,
    UserName VARCHAR(40) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (EmployeeID) REFERENCES mk_employees(EmployeeID) ON DELETE CASCADE
);

-- Insert sample job positions
INSERT INTO mk_post (PostName) VALUES
('Admin'),
('Manager'),
('HR Officer'),
('Sales Representative'),
('Accountant'),
('Clerk'),
('Intern');