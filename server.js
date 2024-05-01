const express = require("express");
const cookie_parser = require("cookie-parser");
const body_parser = require("body-parser");
const ejs = require("ejs");
const engine = require("ejs-mate");
const path = require("path");
var session = require("express-session");
const mongoose = require("mongoose");
var MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const flash = require("connect-flash");


const port = 8000;
    
const app = express();
// console.log("app is" + express());
mongoose.connect('mongodb://localhost/mydetails');

require("./config/passport");

app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs',engine)
app.set("view engine", 'ejs');
app.use(cookie_parser());
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());

require("./routes/user")(app,passport);

app.use(session({
    secret:"TestKey",
    resave:false,
    saveUninitialized:false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.listen(8000, ()=>{
    console.log("server listening on " + port);
})
