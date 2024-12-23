const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'phonebook'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database.');
    }
});

// API routes

// Get all contacts
app.get('/api/contacts', (req, res) => {
    db.query('SELECT * FROM contacts where is_deleted = 0 order by first_name', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});


app.get('/api/contacts/favorites', (req, res) => {
    db.query('SELECT * FROM contacts where favorite = 1 and is_deleted=0 order by first_name', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Get a single contact by ID
app.get('/api/contact/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM contacts WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.length === 0) {
            res.status(404).send({ message: 'Contact not found' });
        } else {
            res.json(result[0]);
        }
    });
});

// Create a new contact
app.post('/api/contact', (req, res) => {
    console.log(req.body);
    const { first_name, last_name, email_address, phone_number, physical_address } = req.body;
    const query = `
        INSERT INTO contacts (first_name, last_name, email_address, phone_number,  physical_address) 
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [first_name, last_name, email_address, phone_number, physical_address], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.json({ 
                id: results.insertId, 
                first_name, 
                last_name, 
                email_address, 
                phone_number, 
                physical_address 
            });
        }
    });
});

// Update an existing contact
app.put('/api/contact/:id', (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email_address, phone_number, physical_address } = req.body;
    const query = `
        UPDATE contacts 
        SET first_name = ?, last_name = ?, email_address = ?, phone_number = ?, physical_address = ? 
        WHERE id = ?
    `;
    db.query(query, [first_name, last_name, email_address, phone_number, physical_address, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Contact not found' });
        } else {
            res.json({ id, first_name, last_name, email_address, phone_number, physical_address });
        }
    });
});

app.put('/api/contacts/favorite/:id', (req, res) => {
    const { id } = req.params;

    db.query('update contacts set favorite=1 WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Contact set as favorite' });
        } else {
            res.json({ message: 'Contact failed to set as favorite' });
        }
    });
});



// Delete a contact
app.delete('/api/contact/:id', (req, res) => {
    const { id } = req.params;

    db.query('update contacts set is_deleted=1, favorite=0 WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Contact not found' });
        } else {
            res.json({ message: 'Contact deleted successfully' });
        }
    });
});

app.delete('/api/contacts', (req, res) => {
    const id = req.body; // Directly assign req.body as the ID array

    // Check if the ID array is valid
    if (!Array.isArray(id) || id.length === 0) {
        return res.status(400).send({ message: 'Invalid or empty ID array' });
    }

    const placeholders = id.map(() => '?').join(',');
    const query = `UPDATE contacts SET is_deleted=1, favorite=0 WHERE id IN (${placeholders})`;

    db.query(query, id, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Contacts not found' });
        } else {
            res.json({ message: 'Contacts deleted successfully' });
        }
    });
});

app.delete('/api/contacts/favorites', (req, res) => {
    const id = req.body; // Directly assign req.body as the ID array

    // Check if the ID array is valid
    if (!Array.isArray(id) || id.length === 0) {
        return res.status(400).send({ message: 'Invalid or empty ID array' });
    }

    const placeholders = id.map(() => '?').join(',');
    const query = `UPDATE contacts SET favorite=0 WHERE id IN (${placeholders})`;

    db.query(query, id, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Contacts removed from favorites' });
        } else {
            res.json({ message: 'Contacts failed to be removed from favorites' });
        }
    });
});

app.delete('/api/contacts/favorites/:id', (req, res) => {
    const { id } = req.params;

    db.query('update contacts set favorite=0 WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Contact removed from favorites' });
        } else {
            res.json({ message: 'Contact failed to remove from favorites' });
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.use(cors({
    origin: '*'  // Allow only your Angular app to access this backend
}));