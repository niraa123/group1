
// import and set up
const express= require('express');
const app= express();
const path= require('path');
const BodyParser=require('body-parser');
const port=3000;
const sql = require('./DB/db');
const CreateTables = require("./DB/CreateTables");
const DropTables = require("./DB/DropTables");
const InsertTables = require("./DB/InsertToTables");
const CRUD = require('./DB/CRUD')
const cookieParse=require('cookie-parser');
const { render } = require('pug');
app.use(cookieParse())
app.use(express.static(path.join(__dirname,"static")));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));

    //pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//routing

app.get('/', (req,res)=>{
    //res.sendFile(path.join(__dirname,"views/Login.html"));
    res.render('LoginPug')
    //res.cookie("userEmail")
});



  app.post('/Logout', (req, res) => {
    Object.keys(req.cookies).forEach((cookieName) => {
      res.clearCookie(cookieName);
    });
    res.render('LoginPug')
  });

  app.get('/Search', (req, res) => {
    res.render('Search', {user: req.cookies.UserFirstName });
  });
  app.get('/GoToSearch', (req,res)=>{
    res.render('Search', {user: req.cookies.UserFirstName })
});


app.post('/BackLogin', (req, res) => {
  res.render('LoginPug');
});

app.get('/CommentsHairdresser', CRUD.getComments)
app.post('/UpdateHairdresser',CRUD.UpdateHairdresser);
app.post('/Profile',CRUD.ProfileClick);
//app.post('/Rate',CRUD.RatePage);
app.post('/Book',CRUD.BookPage);
app.post('/Rate', CRUD.fineNameForRate)
app.post('/Login', CRUD.signIn);
app.post('/ClientRegi', CRUD.CreateNewClient);
app.post('/CreateHairdresser', CRUD.CreateNewHairdresser);
app.post('/registerCustomer', CRUD.registerCustomer);
app.post('/registerHairdresser', CRUD.registerHairdresser);
app.post('/Book', CRUD.insertBooking);
app.post('/Search', CRUD.search)
app.post('/sendRating', CRUD.rate);
app.post('/sendBooking', CRUD.insertBooking);
app.post('/ClientUpdate', CRUD.updateClient);

//set up DB
app.get('/CreateTables',CreateTables.CreateTablesDB);
app.get('/InsertDataToTables',InsertTables.InsertToDB);
app.get('/DropTables',DropTables.DropTables);


//listen
app.listen(port, ()=>{
    console.log("server is running on port", port);
});



