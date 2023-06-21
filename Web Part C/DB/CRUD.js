const express = require('express');
const app = express();
const path = require('path');
const BodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, "static")));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
const sql = require('./db');

//pug is needed here????
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//
//const Hairdresser = require('./static/JS/Hairdresser');


const CreateNewClient = (req, res) => {
  // Validate info exists
  if (!req.body) {
    res.status(400).send("Content cannot be empty");
    return;
  }

  // Pull info from body into object
  const NewClient = {
    name: req.body.cName,
    Email: req.body.cEmail,
    password: req.body.cPassword,
    phone: req.body.cPhone,
    photo: req.body.cPhoto
  };

  // Check if client already exists
  const selectQuery = "SELECT * FROM clients WHERE Email = ?";
  sql.query(selectQuery, NewClient.Email, (err, mysqlres) => {
    if (err) {
      console.log(err);
      res.status(400).send({ message: "Client registration failed" });
      return;
    }

    if (mysqlres.length > 0) {
      // Client already exists
      res.render('ClientRegistration', { message: "Client already exists,Please insert new email !" });
      return;
    }

    // Insert new client
    const insertQuery = "INSERT INTO clients SET ?";
    sql.query(insertQuery, NewClient, (err, mysqlres) => {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "Client registration failed" });
        return;
      }

      console.log("Created new client", req.body);
      res.render('LoginPug', { message: "New client created successfuly, please login!" });
      return;
    });
  });
};

const CreateNewHairdresser = (req, res) => {
  // Validate info exists
  if (!req.body) {
    res.render('HairdresserRegistration', { message: "Content cannot be empty" });
    return;
  }

  // Pull info from body into object
  const NewHairdresser = {
    Name: req.body.name,
    Email: req.body.email,
    Password: req.body.password,
    CityName: req.body.Citylocation,
    Address: req.body.Addresslocation,
    Phone: req.body.phone,
    Description: req.body.description,
    MondayOpen: req.body.mondayfrom,
    MondayClose: req.body.mondayto,
    TuesdayOpen: req.body.tuesdayfrom,
    TuesdayClose: req.body.tuesdayto,
    WednesdayOpen: req.body.wednesdayfrom,
    WednesdayClose: req.body.wednesdayto,
    ThursdayOpen: req.body.thursdayfrom,
    ThursdayClose: req.body.thursdayto,
    FridayOpen: req.body.fridayfrom,
    FridayClose: req.body.fridayto,
    SaturdayOpen: req.body.saturdayfrom,
    SaturdayClose: req.body.saturdayto,
    SundayOpen: req.body.sundayfrom,
    SundayClose: req.body.sundayto,
    PriceLevel: req.body.price,
    Photo: req.body.photo
  };

  // Check if opening hours "from" is not after opening hours "to"
  if (!isValidOpeningHours(NewHairdresser)) {
    res.render('HairdresserRegistration', { message: "Invalid opening hours" });
    return;
  }

  // Check if hairdresser already exists
  const selectHairdresserQuery = "SELECT * FROM hairdressers WHERE Email = ?";
  sql.query(selectHairdresserQuery, NewHairdresser.Email, (err, hairdresserRows) => {
    if (err) {
      console.log(err);
      res.render('HairdresserRegistration', { message: "Hairdresser registration failed" });
      return;
    }

    if (hairdresserRows.length > 0) {
      // Hairdresser already exists, render the registration page with error message and populated form data
      res.render('HairdresserRegistration', { message: "Hairdresser already exists, please register again!" });
      return;
    }

    // Check if city exists in the cities table
    const selectCityQuery = "SELECT * FROM cities WHERE CityName = ?";
    sql.query(selectCityQuery, NewHairdresser.CityName, (err, cityRows) => {
      if (err) {
        console.log(err);
        res.render('HairdresserRegistration', { message: "Hairdresser registration failed" });
        return;
      }

      if (cityRows.length === 0) {
        // City does not exist, insert the new city
        const insertCityQuery = "INSERT INTO cities (CityName) VALUES (?)";
        sql.query(insertCityQuery, NewHairdresser.CityName, (err, insertRes) => {
          if (err) {
            console.log(err);
            res.render('HairdresserRegistration', { message: "Hairdresser registration failed" });
            return;
          }

          insertHairdresser();
        });
      } else {
        // City exists, proceed to insert the hairdresser
        insertHairdresser();
      }
    });
  });

  // Function to insert the hairdresser into the hairdressers table
  function insertHairdresser() {
    const insertQuery = "INSERT INTO hairdressers SET ?";
    sql.query(insertQuery, NewHairdresser, (err, mysqlRes) => {
      if (err) {
        console.log(err);
        res.render('HairdresserRegistration', { message: "Hairdresser registration failed" });
        return;
      }

      console.log("Created new hairdresser", req.body);
      res.render('LoginPug', { message: "Hairdresser registration successful, please login!" });
    });
  }
};

// Function to validate opening hours "from" is not after opening hours "to"
function isValidOpeningHours(hairdresser) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  for (const day of days) {
    const open = hairdresser[`${day}Open`];
    const close = hairdresser[`${day}Close`];

    if (open && close && open >= close) {
      return false;
    }
  }

  return true;
}

const signIn = (req, res) => {//login
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const User = req.body.email;
  const emailValue = req.body.email; // Store entered email value
  const passwordValue = req.body.password; // Store entered password value

  sql.query("SELECT * FROM clients WHERE Email=?", User, (err, mysqlres) => {
    if (err) {
      console.log("error: " + err);
      res.status(400).render('LoginPug', { message: "Error: " + err, emailValue, passwordValue });
      return;
    }

    if (mysqlres.length > 0) {
      
      const password = mysqlres[0].password;
      if (password === req.body.password) {
        res.cookie('UserEmail', mysqlres[0].Email);
        res.cookie('UserFirstName', mysqlres[0].name); // Store the user's name in cookies
        res.redirect('/Search')
        return;
      } else {
        console.log("Client wrong password");
        res.render('LoginPug', { message: "Client wrong password", emailValue, passwordValue });
        return;
      }
    } else {
      sql.query("SELECT * FROM hairdressers WHERE Email=?", User, (err, mysqlres) => {
        if (err) {
          console.log("error: " + err);
          res.status(400).render('LoginPug', { message: "Error: " + err, emailValue, passwordValue });
          return;
        }

        if (mysqlres.length > 0) {
          const password = mysqlres[0].Password;
          if (password === req.body.password) {
            res.cookie('UserEmail', mysqlres[0].Email);
            res.cookie('UserFirstName', mysqlres[0].Name); // Store the user's  name in cookies
            res.redirect('/CommentsHairdresser')
            
            return;
          } else {
            console.log("Hairdresser wrong password");
            res.render('LoginPug', { message: "Hairdresser wrong password", emailValue, passwordValue });
            return;
          }
        } else {
          console.log("User Not Exist");
          res.render('LoginPug', { message: "User Not Exist", emailValue, passwordValue });
          return;
        }
      });
    }
  });
}


const registerCustomer = (req, res) => {
  console.log("Client Regi clicked");
  res.render("ClientRegistration");
};
const registerHairdresser = (req, res) => {
  console.log("Client Regi clicked");
  res.render('HairdresserRegistration');
};

const insertBooking = (req, res) => {
  console.log("Book clicked");
  if (!req.body) {
    res.status(400).send("Content cannot be empty");
    return;
  }

  console.log('date: ' +req.body.date +'  visiting_time:' +req.body.time);
  // Pull info from body into object
  const NewBookings = {
    CustomerEmail: req.cookies?.UserEmail, 
    HairdresserEmail: req.cookies?.selectedHairdresserEmail,
    date: req.body.date,
    visiting_time: req.body.time,
  };

  const insertQuery = "INSERT INTO Bookings SET ?";
  sql.query(insertQuery, NewBookings, (err, mysqlres) => {
    if (err) {
      console.log(err);
      res.status(400).send({ message: "Bookings failed" });
      return;
    }

    console.log("Created new Bookings", req.body);
    res.render('messageClient',{v1: 'Your order has been received, please verify confirmationr!', user: req.cookies.UserFirstName} ); //,{} 
      return;
  });
}


const search = (req, res) => {
  console.log("search clicked");
  if (!req.body) {
    res.status(400).send("Content cannot be empty");
    return;
  }
  var city = req.body.location;
  const searchQuery = "SELECT * FROM hairdressers WHERE CityName LIKE ? ";
  sql.query(searchQuery, city + "%", (err, mysqlres) => {
    if (err) {
      console.log("error: ", err);
      res.status(400).send({ message: "Could not search city" });
      return;
    }
    if (mysqlres.length > 0) {
      const NewSearch = {
        CustomerEmail: req.cookies?.UserEmail,
        CityName: req.body.location
      };

      const insertQuery = "INSERT INTO Searches SET ?";
      sql.query(insertQuery, NewSearch, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send({ message: "Search failed" });
          return;
        }

        const hairdressers = mysqlres.map((result) => {
          return new Hairdresser(
            result.Name,
            result.Email,
            result.Rating,
            result.Description,
            result.Address,
            result.Phone,
            result.PriceLevel
          );
        }); 
        //console.log(mysqlres);
        res.cookie("hairdressers" ,hairdressers )
        res.cookie("CitySearched" ,req.body.location )
        console.log("i click on search and ")
        console.log(req.cookies.CitySearched);
        console.log(hairdressers);
        res.render('HairdresserList', { user: req.cookies.UserFirstName, hairdressers:hairdressers });
        return;
      });
    } else {
      res.render('Search', { message: "We don't have any hairdressers in your area yet", user: req.cookies.UserFirstName });
      return;
    }
  });
};

const rate = (req, res) => {  
  console.log("rate clicked");
  if (!req.body) {
    res.status(400).send("Content cannot be empty");
    return;
  }

  // Pull info from body into object
  var RC =req.body.rateChosen
  var rate= doRating(RC);
  var R;
  var COUNT;
  var newCOUNT;
  var newRate;
  const NewRating = {
    CustomerEmail: req.cookies?.UserEmail, 
    HairdresserEmail: req.cookies?.selectedHairdresserEmail, 
    Rating: rate,
    Content: req.body.comment
  };

  //Data on hairdresser corend rating
  const searchQuery = "SELECT Rating , CommentCount FROM hairdressers WHERE Email = ? ";
  sql.query(searchQuery, NewRating.HairdresserEmail, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send({ message: "hairdresser failed" });
      return;
    }
    
    if (result.length > 0) {
      R = result[0].Rating;
      COUNT = result[0].CommentCount;
      //Calculation new rating values
      newCOUNT=COUNT+1;
      newRate=((R*COUNT)+rate)/newCOUNT;
    }
    console.log("hairdresser faond");
    
  });

  //Creating a querys
  const updateHairdresserRatingQuery = "UPDATE hairdressers set Rating = ?, CommentCount=? WHERE Email = ?";
  const insertCommentsQuery = "INSERT INTO comments SET ?"; 

 //insert the comment
  sql.query(insertCommentsQuery, NewRating, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send({ message: "Rating failed" });
      return;
    }

    console.log("Created new comment", req.body);
      //
    const data = [newRate , newCOUNT, NewRating.HairdresserEmail]
    sql.query(updateHairdresserRatingQuery, data, (err, mysqlres) => {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "update hairdressers failed" });
        return;
      }
      res.render('messageClient',{v1: 'Your comment has been saved. Thanks!', user: req.cookies.UserFirstName} );
      console.log("update hairdressers");
    });

    
    return;
  });
 
  
}


const BookPage = (req, res) => {
  const selectedHairdresserEmail = req.body.selectedHairdresserBook;
  console.log(selectedHairdresserEmail,);
  // Save the selected hairdresser's email in a cookie
  res.cookie('selectedHairdresserEmail', selectedHairdresserEmail);
  
  // Additional processing or redirect the user
  res.render('Book', { user: req.cookies.UserFirstName});
};

const RatePage = (req, res) => {
  const selectedHairdresserEmail = req.body.selectedHairdresserRate;
  console.log(selectedHairdresserEmail);
  // Save the selected hairdresser's email in a cookie
  res.cookie('selectedHairdresserEmail', selectedHairdresserEmail);
  
  res.render('RatePage', { user: req.cookies.UserFirstName});
};

const ProfileClick = (req, res) => {
  const UserEmail = req.cookies.UserEmail;
  const query = 'SELECT * FROM clients WHERE Email = ?';

  sql.query(query, UserEmail, (err, mysqlres) => {
    if (err) {
      console.log('Error: ' + err);
      return;
    }
    if (mysqlres.length > 0) {
      const clientData = mysqlres[0]; // Assuming there is only one client with the given email
      res.render('ClientProfile', { client: clientData , user: req.cookies.UserFirstName});
    } else {
      const query = 'SELECT * FROM hairdressers WHERE Email = ?';
      sql.query(query, [UserEmail], (err, results) => {
        if (err) {
          console.error('Error retrieving hairdresser data:', err);
        } else {
          const hairdresserData = results[0]; // Assuming there is only one hairdresser with the given email
          console.log(hairdresserData);
          res.render('HairdresserProfile', { hairdresser: hairdresserData , user: req.cookies.UserFirstName});
        }
      });
    }
  });
};

const fineNameForRate=(req,res) =>{
  console.log('looking for name');
  const selectedHairdresserEmail = req.body.selectedHairdresserRate;
  res.cookie('selectedHairdresserEmail', selectedHairdresserEmail);
  //const User= req.cookies?.selectedHairdresserEmail //res.cookies?.-------------------------------
  const findeNameQuery='SELECT Name FROM hairdressers WHERE Email=?'
  sql.query(findeNameQuery, selectedHairdresserEmail, (err, result) => {
    if (err) {
      console.log("error: " + err);
      res.status(400).render('LoginPug', { message: "Error: " + err, emailValue, passwordValue });
      return;
    }
    if (result.length > 0) {
      const name= result[0].Name;
      console.log(name);
      res.render('Ratepage', {user: req.cookies.UserFirstName, v1:name})

    }
    console.log("hairdresser faond");
  
  })
}

function doRating(RC){
  if (RC==1){
    return 5;
  }else{
    if (RC==2){
      return 4;
    }else{
      if (RC==3){
        return 3;
      }else{
        if (RC==4){
          return 2;
        }else{
          return 1;
        }
      }    
    }
  }
  
  
    
  
}

const getComments=(req, res) => {
  console.log("commentsHairdresser");

  const user=  req.cookies?.UserEmail; //'hairstudio101@example.com' //
  console.log('user hair: ' + user);
  
  //Data on hairdresser
  var hairdresser;
  const hairdresserQuery = "SELECT Name, Email, Rating, Description, Address, Phone, PriceLevel FROM hairdressers WHERE Email = ?";
  sql.query(hairdresserQuery, user, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send({ message: "hairdresser not faond" });
      return;
    }

    if (result.length > 0) {
      hairdresser= new Hairdresser(
        result[0].Name,
        result[0].Email,
        result[0].Rating,
        result[0].Description,
        result[0].Address,
        result[0].Phone,
        result[0].PriceLevel
        );
      console.log("hairdresser faond");
    } 
  });

  //Data on comments 
  var comments;
  const commentsQuery = "SELECT CustomerEmail,  timestamp, Rating, Content FROM comments WHERE HairdresserEmail = ? ";
  sql.query(commentsQuery, user, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send({ message: "comments not faond" });
      return;
    }
    
    //const getName="selsect name from clients WHERE Email = ?"
    if (result.length > 0) {
      comments = result.map((result) => {
        
        console.log(result);
        return new Comment(
          result.CustomerEmail,
          result.timestamp.toDateString(),
          result.Rating,
          result.Content
          
        );
        
      })
      
    } else{
      comments=0;
    } 
    res.cookie("comments" ,comments)
    res.render('CommentsHairdresser', {user: req.cookies.UserFirstName , comments: comments, hairdresser:hairdresser });
  });
  

}

const updateClient = (req,res) =>{
  // Validate info exists
  if (!req.body) {
    res.status(400).send("Content cannot be empty");
    return;
  }

  // Pull info from body into object
  const NewClient = {
    name: req.body.cName,
    Email: req.body.cEmail,
    password: req.body.cPassword,
    phone: req.body.cPhone,
    photo: req.body.cPhoto
  };

  const updateClientQuery= "UPDATE clients set ? WHERE Email = ?";
  const data = [NewClient, NewClient.Email]
  sql.query(updateClientQuery, data, (err, mysqlres) => {
    if (err) {
      console.log(err);
      res.status(400).send({ message: "update clients" });
      return;
    }
    console.log("update hairdressers");
    res.render('messageClient',{v1: 'Your details have been updated!', user: req.cookies.UserFirstName} );
      return;
  });
}

const UpdateHairdresser = (req, res) => {
  const { name, email, password, Citylocation, Addresslocation, phone, description, price, photo, mondayFrom, mondayTo, tuesdayFrom, tuesdayTo, wednesdayFrom, wednesdayTo, thursdayFrom, thursdayTo, fridayFrom, fridayTo, saturdayFrom, saturdayTo, sundayFrom, sundayTo } = req.body;

  const query = `
    UPDATE hairdressers
    SET Name = ?, Password = ?, CityName = ?, Address = ?, Phone = ?, Description = ?, PriceLevel = ?, Photo = ?,
        MondayOpen = ?, MondayClose = ?, TuesdayOpen = ?, TuesdayClose = ?, WednesdayOpen = ?, WednesdayClose = ?,
        ThursdayOpen = ?, ThursdayClose = ?, FridayOpen = ?, FridayClose = ?, SaturdayOpen = ?, SaturdayClose = ?,
        SundayOpen = ?, SundayClose = ?
    WHERE Email = ?
  `;

  const values = [
    name, password, Citylocation, Addresslocation, phone, description, price, photo,
    mondayFrom, mondayTo, tuesdayFrom, tuesdayTo, wednesdayFrom, wednesdayTo,
    thursdayFrom, thursdayTo, fridayFrom, fridayTo, saturdayFrom, saturdayTo,
    sundayFrom, sundayTo, email
  ];

  sql.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating hairdresser profile:', err);
      res.sendStatus(500);
    } else {
      console.log('Hairdresser profile updated successfully');
      // Redirect the user to the updated profile page or any other desired page
      res.redirect('/CommentsHairdresser')

      //res.render('CommentsHairdresser', {user: req.cookies.UserFirstName, message: "Hairdresser updated Succesfully" })
    }
  });
};



class Comment{
  constructor(Customer,  timestamp, Rating, Content){
    this.Customer= Customer;
    this.timestamp= timestamp;
    this.Rating= Rating;
    this.Content= Content;
  }
}

class Hairdresser {
  constructor(name, Email,rating, description, address, phoneNumber, priceLevel) {
    this.name = name;
    this.Email=Email;
    this.rating = rating;
    this.description = description;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.priceLevel = priceLevel;
    this.isRated = false;
  }
}

module.exports = { CreateNewClient, CreateNewHairdresser, signIn, registerCustomer, registerHairdresser, insertBooking, search,rate,BookPage,RatePage,ProfileClick,UpdateHairdresser,getComments, updateClient, fineNameForRate };




