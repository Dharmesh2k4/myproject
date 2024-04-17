const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project"
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO `login`(`firstname`, `lastname`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json('error');
        }
        return res.json('data');
    })
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM `login` WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json('error');
        }
        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    })
});

app.post('/forgot-password', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json('Email and password are required');
    }

    // Check if the email exists in the database
    const checkEmailQuery = "SELECT * FROM `login` WHERE `email` = ?";
    db.query(checkEmailQuery, [email], (err, data) => {
        if (err) {
            return res.json('error');
        }

        if (data.length === 0) {
            return res.json('Email not found');
        }

        // Update the password in the database for the specified email
        const updatePasswordQuery = "UPDATE `login` SET `password` = ? WHERE `email` = ?";
        db.query(updatePasswordQuery, [password, email], (err) => {
            if (err) {
                return res.json('error');
            }

            return res.json('Success');
        });
    });
});

app.listen(8081, () => {
    console.log("listening")
});
