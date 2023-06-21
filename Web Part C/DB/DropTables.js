const express = require('express');
const app = express();
const path = require('path');
const BodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, "static")));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));

const sql = require('./db');
const DropTables = (req, res) => {

    // Run drop table queries
    const Q1 = "DROP TABLE IF EXISTS bookings;\n";
    const Q2 = "DROP TABLE IF EXISTS searches;\n";
    const Q3 = "DROP TABLE IF EXISTS comments;\n";
    const Q4 = "DROP TABLE IF EXISTS hairdressers;\n";
    const Q5 = "DROP TABLE IF EXISTS clients;\n";
    const Q6 = "DROP TABLE IF EXISTS cities;\n";

    sql.query(Q1, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send("Drop table query for bookings failed");
            return;
        }
        console.log("Dropped bookings table");
        sql.query(Q2, (err, mysqlres) => {
            if (err) {
                console.log(err);
                res.status(400).send("Drop table query for searches failed");
                return;
            }
            console.log("Dropped searches table");
            sql.query(Q3, (err, mysqlres) => {
                if (err) {
                    console.log(err);
                    res.status(400).send("Drop table query for comments failed");
                    return;
                }
                console.log("Dropped comments table");
                sql.query(Q4, (err, mysqlres) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send("Drop table query for hairdressers failed");
                        return;
                    }
                    console.log("Dropped hairdressers table");
                    sql.query(Q5, (err, mysqlres) => {
                        if (err) {
                            console.log(err);
                            res.status(400).send("Drop table query for clients failed");
                            return;
                        }
                        console.log("Dropped clients table");
                        sql.query(Q6, (err, mysqlres) => {
                            if (err) {
                                console.log(err);
                                res.status(400).send("Drop table query for cities failed");
                                return;
                            }
                            console.log("Dropped cities table");
                            res.send("Tables dropped successfully");
                        });
                    });
                });
            });
        });
    });
};

module.exports = { DropTables };
