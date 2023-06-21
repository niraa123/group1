const express = require('express');
const app = express();
const path = require('path');
const BodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, "static")));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));
const sql = require('./db');

const CreateTablesDB = (req, res) => {
    // Create cities table
    const Q1 = `
        CREATE TABLE cities (
            ID INT NOT NULL AUTO_INCREMENT,
            CityName VARCHAR(255) NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (ID, CityName),
            UNIQUE (CityName)
        );
    `;

    // Create clients table
    const Q2 = `
        CREATE TABLE clients (
            ID INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            Email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            photo VARCHAR(255),
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (ID, Email),
              INDEX (Email),
            UNIQUE (Email)
        );
    `;

    // Create hairdressers table
    const Q3 = `
        CREATE TABLE hairdressers (
            ID INT NOT NULL AUTO_INCREMENT,
            Name VARCHAR(255) NOT NULL,
            Email VARCHAR(255) NOT NULL,
            Password VARCHAR(255) NOT NULL,
            CityName VARCHAR(255),
            Address VARCHAR(255),
            Phone VARCHAR(20),
            Description VARCHAR(255),
            MondayOpen TIME,
            MondayClose TIME,
            TuesdayOpen TIME,
            TuesdayClose TIME,
            WednesdayOpen TIME,
            WednesdayClose TIME,
            ThursdayOpen TIME,
            ThursdayClose TIME,
            FridayOpen TIME,
            FridayClose TIME,
            SaturdayOpen TIME,
            SaturdayClose TIME,
            SundayOpen TIME,
            SundayClose TIME,
            PriceLevel VARCHAR(255) NOT NULL,
            Photo VARCHAR(255),
            Rating DECIMAL(3, 2),
            CommentCount INT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (ID , Email),
            FOREIGN KEY (CityName) REFERENCES cities (CityName),
              INDEX (Email),
            UNIQUE (Email)
        );
    `;

    // Create comments table
    const Q4 = `
        CREATE TABLE comments (
            ID INT NOT NULL AUTO_INCREMENT,
            CustomerEmail VARCHAR(255) NOT NULL,
            HairdresserEmail VARCHAR(255) NOT NULL,
            Rating INT NOT NULL,
            Content VARCHAR(255) NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (ID),
            FOREIGN KEY (CustomerEmail) REFERENCES clients (Email),
            FOREIGN KEY (HairdresserEmail) REFERENCES hairdressers (Email)
        );
    `;

    // Create searches table
    const Q5 = `
        CREATE TABLE searches (
            ID INT NOT NULL AUTO_INCREMENT,
            CustomerEmail VARCHAR(255) NOT NULL,
            CityName VARCHAR(255) NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (ID, timestamp, CustomerEmail),
            FOREIGN KEY (CustomerEmail) REFERENCES clients (Email),
            FOREIGN KEY (CityName) REFERENCES cities (CityName)
        );
    `;

    // Create bookings table
    const Q6 = `
        CREATE TABLE bookings (
            ID INT NOT NULL AUTO_INCREMENT,
            CustomerEmail VARCHAR(255) NOT NULL,
            HairdresserEmail VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            visiting_time TIME NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (ID,CustomerEmail, HairdresserEmail, date),
            FOREIGN KEY (CustomerEmail) REFERENCES clients (Email),
            FOREIGN KEY (HairdresserEmail) REFERENCES hairdressers (Email)
        );
    `;

    // Run the create table queries
    sql.query(Q1, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send("Create table query for cities failed");
            return;
        }
        console.log("Created cities table");
        sql.query(Q2, (err, mysqlres) => {
            if (err) {
                console.log(err);
                res.status(400).send("Create table query for clients failed");
                return;
            }
            console.log("Created clients table");
            sql.query(Q3, (err, mysqlres) => {
                if (err) {
                    console.log(err);
                    res.status(400).send("Create table query for hairdressers failed");
                    return;
                }
                console.log("Created hairdressers table");
                sql.query(Q4, (err, mysqlres) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send("Create table query for comments failed");
                        return;
                    }
                    console.log("Created comments table");
                    sql.query(Q5, (err, mysqlres) => {
                        if (err) {
                            console.log(err);
                            res.status(400).send("Create table query for searches failed");
                            return;
                        }
                        console.log("Created searches table");
                        sql.query(Q6, (err, mysqlres) => {
                            if (err) {
                                console.log(err);
                                res.status(400).send("Create table query for bookings failed");
                                return;
                            }
                            console.log("Created bookings table");
                            res.send("Tables created successfully");
                        });
                    });
                });
            });
        });
    });
};

module.exports = { CreateTablesDB };
