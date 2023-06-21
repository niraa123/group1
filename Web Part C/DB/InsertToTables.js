const express = require('express');
const app = express();
const path = require('path');
const BodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, "static")));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));

const sql = require('./db');


const InsertToDB = (req,res)=>{

     const Q1 = `
      INSERT INTO cities (CityName)
VALUES ('Tel Aviv'), ('Jerusalem'), ('Haifa'), ('Rishon LeZion'), ('Petah Tikva'),
       ('Ashdod'), ('Netanya'), ('Beer Sheva'), ('Holon'), ('Eilat'),
       ('Ramat Gan'), ('Bnei Brak'), ('Rehovot'), ('Kfar Saba'), ('Herzliya');

`;

    // Create clients table
    const Q2 = `
        INSERT INTO clients (name, email, password, phone, photo)
        VALUES
          ('John Doe', 'john.doe@example.com', 'password1', '1234567890', 'john.jpg'),
          ('Jane Smith', 'jane.smith@example.com', 'password2', '0987654321', 'jane.jpg'),
          ('David Johnson', 'david.johnson@example.com', 'password3', '5555555555', 'david.jpg'),
          ('Emily Wilson', 'emily.wilson@example.com', 'password4', '7777777777', 'emily.jpg'),
          ('Michael Brown', 'michael.brown@example.com', 'password5', '9999999999', 'michael.jpg'),
          ('Sarah Davis', 'sarah.davis@example.com', 'password6', '1111111111', 'sarah.jpg'),
          ('Daniel Martinez', 'daniel.martinez@example.com', 'password7', '2222222222', 'daniel.jpg'),
          ('Sophia Thompson', 'sophia.thompson@example.com', 'password8', '3333333333', 'sophia.jpg'),
          ('James Anderson', 'james.anderson@example.com', 'password9', '4444444444', 'james.jpg'),
          ('Olivia Clark', 'olivia.clark@example.com', 'password10', '6666666666', 'olivia.jpg');  
`;

    // Create hairdressers table
    const Q3 = `
       INSERT INTO hairdressers (Name, Email, Password, CityName, Address, Phone, Description, MondayOpen, MondayClose, TuesdayOpen, TuesdayClose, WednesdayOpen, WednesdayClose, ThursdayOpen, ThursdayClose, FridayOpen, FridayClose, SaturdayOpen, SaturdayClose, SundayOpen, SundayClose, PriceLevel, Photo, Rating, CommentCount)
          VALUES
            ('Hair Studio 101', 'hairstudio101@example.com', 'password1', 'Tel Aviv', 'Dizinguf 180', '0549408989', 'Experience personalized and trendy haircuts at Hair Couture Salon.', '08:00:00', '17:00:00', '08:00:00', '17:00:00', '08:00:00', '17:00:00', '08:00:00', '17:00:00', '08:00:00', '17:00:00', '08:00:00', '17:00:00', '08:00:00', '17:00:00', 'Very Expensive', 'photo1.jpg', 4.5, 10),
            ('Chic Cuts Salon', 'chiccuts@example.com', 'password2', 'Jerusalem', 'Address 2', '987654321', 'Description 2', '09:00:00', '18:00:00', '09:00:00', '18:00:00', '09:00:00', '18:00:00', '09:00:00', '18:00:00', '09:00:00', '18:00:00', '09:00:00', '18:00:00', '09:00:00', '18:00:00', 'Expensive', 'photo2.jpg', 4.0, 8),
            ('Blissful Tresses', 'blissfultresses@example.com', 'password3', 'Haifa', 'Address 3', '555123456', 'Description 3', '10:00:00', '19:00:00', '10:00:00', '19:00:00', '10:00:00', '19:00:00', '10:00:00', '19:00:00', '10:00:00', '19:00:00', '10:00:00', '19:00:00', '10:00:00', '19:00:00', 'Regular', 'photo3.jpg', 4.2, 12),
            ('The Cutting Edge', 'cuttingedge@example.com', 'password4', 'Eilat', 'Address 4', '999888777', 'Description 4', '11:00:00', '20:00:00', '11:00:00', '20:00:00', '11:00:00', '20:00:00', '11:00:00', '20:00:00', '11:00:00', '20:00:00', '11:00:00', '20:00:00', '11:00:00', '20:00:00', 'Cheap', 'photo4.jpg', 3.8, 6),
            ('The Glamour Room', 'glamourroom@example.com', 'password5', 'Netanya', 'Address 5', '111222333', 'Description 5', '12:00:00', '21:00:00', '12:00:00', '21:00:00', '12:00:00', '21:00:00', '12:00:00', '21:00:00', '12:00:00', '21:00:00', '12:00:00', '21:00:00', '12:00:00', '21:00:00', 'Cheap', 'photo5.jpg', 4.7, 15),
            ('Style Fusion Salon', 'stylefusion@example.com', 'password6', 'Tel Aviv', 'Herzel 15', '0524783756', 'This hairdresser is known for their exceptional styling skills and personalized approach.', '13:00:00', '22:00:00', '13:00:00', '22:00:00', '13:00:00', '22:00:00', '13:00:00', '22:00:00', '13:00:00', '22:00:00', '13:00:00', '22:00:00', '13:00:00', '22:00:00', 'Cheap', 'photo6.jpg', 4.3, 9),
            ('Sleek and Chic Hair', 'sleekandchic@example.com', 'password7', 'Jerusalem', 'Address 7', '777888999', 'Description 7', '14:00:00', '23:00:00', '14:00:00', '23:00:00', '14:00:00', '23:00:00', '14:00:00', '23:00:00', '14:00:00', '23:00:00', '14:00:00', '23:00:00', '14:00:00', '23:00:00', 'Expensive', 'photo7.jpg', 4.1, 11),
            ('Luscious Locks Salon', 'lusciouslocks@example.com', 'password8', 'Haifa', 'Address 8', '222333444', 'Description 8', '15:00:00', '00:00:00', '15:00:00', '00:00:00', '15:00:00', '00:00:00', '15:00:00', '00:00:00', '15:00:00', '00:00:00', '15:00:00', '00:00:00', '15:00:00', '00:00:00', 'Expensive', 'photo8.jpg', 3.9, 7),
            ('Hair Affair', 'hairaffair@example.com', 'password9', 'Tel Aviv', 'Alenbi 55', '0509868234', ' an experienced hairdresser with a passion for creating stunning transformations.', '16:00:00', '01:00:00', '16:00:00', '01:00:00', '16:00:00', '01:00:00', '16:00:00', '01:00:00', '16:00:00', '01:00:00', '16:00:00', '01:00:00', '16:00:00', '01:00:00','Very Expensive', 'photo9.jpg', 4.4, 13),
            ('Shear Elegance', 'shearelegance@example.com', 'password10', 'Jerusalem', 'Address 10', '111111111', 'Description 10', '17:00:00', '02:00:00', '17:00:00', '02:00:00', '17:00:00', '02:00:00', '17:00:00', '02:00:00', '17:00:00', '02:00:00', '17:00:00', '02:00:00', '17:00:00', '02:00:00', 'Very Expensive', 'photo10.jpg', 4.6, 14);
`;

    // Create comments table
    const Q4 = `
        INSERT INTO comments (CustomerEmail, HairdresserEmail, Rating, Content)
VALUES
    ('john.doe@example.com', 'hairstudio101@example.com', 4, 'Great service!'),
    ('jane.smith@example.com', 'hairstudio101@example.com', 5, 'I had a great experience at this salon! The staff was friendly and knowledgeable, and they really listened to what I wanted. My hair turned out beautifully and I left feeling like a new person'),
    ('david.johnson@example.com', 'blissfultresses@example.com', 3, 'I have been coming to this hairdresser for years, and I always leave happy with my haircut. The staff is skilled and friendly, and they always make me feel welcome. I would highly recommend this salon to anyone looking for a great haircut!'),
    ('emily.wilson@example.com', 'cuttingedge@example.com', 4, 'Friendly staff and great hair styling.'),
    ('michael.brown@example.com', 'glamourroom@example.com', 5, 'Highly recommended! Amazing job.'),
    ('sarah.davis@example.com', 'stylefusion@example.com', 1, 'Unfortunately, my experience at this salon was not great. The hairdresser seemed distracted and rushed, and didnt really take the time to listen to what I wanted. The end result was not what I had hoped for, and I left feeling disappointed'),
    ('daniel.martinez@example.com', 'sleekandchic@example.com', 4, 'Professional and attentive.'),
    ('sophia.thompson@example.com', 'lusciouslocks@example.com', 3, 'Decent service, could have been better.'),
    ('james.anderson@example.com', 'hairaffair@example.com', 5, 'Outstanding hairdresser!'),
    ('olivia.clark@example.com', 'shearelegance@example.com', 4, 'Very satisfied with my haircut.')
    ;`;

    // Create searches table
    const Q5 = `
           INSERT INTO Searches (CustomerEmail, CityName)
VALUES 
  ('john.doe@example.com', 'Tel Aviv'),
  ('jane.smith@example.com', 'Jerusalem'),
  ('david.johnson@example.com', 'Haifa'),
  ('david.johnson@example.com', 'Eilat'),
  ('michael.brown@example.com', 'Netanya'),
  ('michael.brown@example.com', 'Herzliya'),
  ('michael.brown@example.com', 'Ashdod'),
  ('daniel.martinez@example.com', 'Beer Sheva'),
  ('james.anderson@example.com', 'Rishon LeZion'),
  ('james.anderson@example.com', 'Bnei Brak');`;

    // Create bookings table
    const Q6 = `
        INSERT INTO Bookings (CustomerEmail, HairdresserEmail, date, visiting_time)
VALUES 
  ('john.doe@example.com', 'hairstudio101@example.com', '2023-06-04', '10:00:00'),
  ('jane.smith@example.com', 'chiccuts@example.com', '2023-06-05', '11:30:00'),
  ('david.johnson@example.com', 'blissfultresses@example.com', '2023-06-06', '14:15:00'),
  ('emily.wilson@example.com', 'cuttingedge@example.com', '2023-06-07', '16:45:00'),
  ('michael.brown@example.com', 'glamourroom@example.com', '2023-06-08', '09:30:00'),
  ('sarah.davis@example.com', 'stylefusion@example.com','2023-06-09', '13:00:00'),
  ('daniel.martinez@example.com', 'sleekandchic@example.com', '2023-06-10', '15:45:00'),
  ('sophia.thompson@example.com', 'lusciouslocks@example.com', '2023-06-11', '11:00:00'),
  ('james.anderson@example.com', 'hairaffair@example.com', '2023-06-12', '14:30:00'),
  ('olivia.clark@example.com', 'shearelegance@example.com', '2023-06-13', '10:45:00');`;

    // Run the create table queries
    sql.query(Q1, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send("Inserted to table query for cities failed");
            return;
        }
        console.log("Inserted to cities table");
        sql.query(Q2, (err, mysqlres) => {
            if (err) {
                console.log(err);
                res.status(400).send("Inserted to table query for clients failed");
                return;
            }
            console.log("Inserted to clients table");
            sql.query(Q3, (err, mysqlres) => {
                if (err) {
                    console.log(err);
                    res.status(400).send("Inserted to table query for hairdressers failed");
                    return;
                }
                console.log("Inserted to hairdressers table");
                sql.query(Q4, (err, mysqlres) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send("Inserted to table query for comments failed");
                        return;
                    }
                    console.log("Inserted to comments table");
                    sql.query(Q5, (err, mysqlres) => {
                        if (err) {
                            console.log(err);
                            res.status(400).send("Inserted to table query for searches failed");
                            return;
                        }
                        console.log("Inserted to searches table");
                        sql.query(Q6, (err, mysqlres) => {
                            if (err) {
                                console.log(err);
                                res.status(400).send("Inserted to table query for bookings failed");
                                return;
                            }
                            console.log("Inserted to bookings table");
                            res.send("Inserted to Tables successfully");
                        });
                    });
                });
            });
        });
    });
};



module.exports = {InsertToDB};