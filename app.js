const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json()); // Fix JSON middleware

// Configure MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Anas",
    database: "bookshop" // Database for bookshop
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.log("Error connecting to MySQL:", err);
    }
});

// Get bookshop by ID
app.get("/bookshops/:id", (req, res) => {
    const query = "SELECT * FROM bookshops WHERE id = ?";
    
    connection.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the bookshop", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.json(results[0]);
    });
});

// Get all cities
app.get("/cities", (req, res) => {
    const query = "SELECT * FROM cities"; // Assuming we have a 'cities' table
    
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving cities", details: err.message });
        }
        res.json(results);
    });
});

// Get bookshop by name
app.get("/bookshops/name/:name", (req, res) => {
    const query = "SELECT * FROM bookshops WHERE name = ?";
    
    connection.query(query, [req.params.name], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the bookshop", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.json(results[0]);
    });
});

// Get bookshop by email id
app.get("/bookshops/email/:email", (req, res) => {
    const query = "SELECT * FROM bookshops WHERE email = ?";
    
    connection.query(query, [req.params.email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the bookshop by email", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.json(results[0]);
    });
});

// Update bookshop name
app.put("/bookshops/:id/name", (req, res) => {
    const { name } = req.body;
    const query = "UPDATE bookshops SET name = ? WHERE id = ?";
    
    connection.query(query, [name, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error updating bookshop name", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.status(200).json({ message: "Bookshop name has been updated" });
    });
});

// Update bookshop email
app.put("/bookshops/:id/email", (req, res) => {
    const { email } = req.body;
    const query = "UPDATE bookshops SET email = ? WHERE id = ?";
    
    connection.query(query, [email, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error updating bookshop email", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.status(200).json({ message: "Bookshop email has been updated" });
    });
});

// Add a new bookshop (add one shop)
app.post("/bookshops", (req, res) => {
    const { name, email, location } = req.body; // Assuming name, email, and location
    const query = "INSERT INTO bookshops (name, email, location) VALUES (?, ?, ?)";
    
    connection.query(query, [name, email, location], (err) => {
        if (err) {
            return res.status(500).json({ error: "Error adding new bookshop", details: err.message });
        }
        res.status(201).json({ message: "Bookshop has been added" });
    });
});

// Delete a bookshop (delete one shop)
app.delete("/bookshops/:id", (req, res) => {
    const query = "DELETE FROM bookshops WHERE id = ?";
    
    connection.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error deleting the bookshop", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.status(200).json({ message: "Bookshop has been deleted" });
    });
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server has been started on http://localhost:${port}`);
});
