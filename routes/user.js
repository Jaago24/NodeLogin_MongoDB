const passport = require("passport");

module.exports = (app, passport) =>{
    app.get("/", function(req,res,next){
        res.render("index")
    });

    app.get("/signup", function(req,res){
        res.render("users/signup", {title:"signup"})
    });

    app.post("/signup", passport.authenticate("local.signup", {
        successRedirect: "/",
        failureRedirect: "/signup",
        failureFlash: true
    }))

    app.get("/login", function(req,res){
        res.render("users/login", {title:"login"})
    });
}