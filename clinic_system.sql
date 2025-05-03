-- clinic_system.sql
-- Database: Clinic Booking System

-- Drop tables if they exist
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS doctors;
DROP TABLE IF EXISTS services;

-- Create Patients table
CREATE TABLE patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    date_of_birth DATE NOT NULL
);

-- Create Doctors table
CREATE TABLE doctors (
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL
);

-- Create Services table
CREATE TABLE services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    fee DECIMAL(10, 2) NOT NULL
);

-- Create Appointments table
CREATE TABLE appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    service_id INT NOT NULL,
    appointment_date DATETIME NOT NULL,
    status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id),
    FOREIGN KEY (service_id) REFERENCES services(service_id)
);

-- Insert sample data
INSERT INTO patients (full_name, email, phone, gender, date_of_birth) VALUES
('John Doe', 'john@example.com', '0244123456', 'Male', '1985-06-15'),
('Jane Smith', 'jane@example.com', '0200987654', 'Female', '1990-09-25');

INSERT INTO doctors (full_name, specialization, email, phone) VALUES
('Dr. Alice Brown', 'Cardiology', 'alice@clinic.com', '0244001122'),
('Dr. Bob White', 'Dermatology', 'bob@clinic.com', '0244332211');

INSERT INTO services (name, description, fee) VALUES
('General Consultation', 'Basic health consultation with a general doctor', 50.00),
('Skin Checkup', 'Dermatological examination for skin issues', 75.00);

INSERT INTO appointments (patient_id, doctor_id, service_id, appointment_date, status) VALUES
(1, 1, 1, '2025-05-10 09:00:00', 'Scheduled'),
(2, 2, 2, '2025-05-11 10:30:00', 'Scheduled');