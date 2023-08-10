var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const db = require('../config/database');
const validator = require('validator');

//localhost:3000/users/registration
router.post("/registration", async function(req,res,next){
  var{ username, email, password } = req.body;
  // var score = validator.isStrongPassword(password)
  // if(validator.isStrongPassword(password)){
  //   return res.send("is strong password")
  // } else {
  //   return res.send("is weak password");
  // }

  //server side validation
  //rules check
  try{
    // uniqueness check
    //does the username exist in the users table? runs sql statement giving the rows that have that username value
    var[results, _] = await db.execute(`select id from users where username=?`,
    [username]);
    if(results && results.length > 0){
      console.log(`${username} already exists`);
      req.flash("error", "Registration failed: Username already exists.");
      return req.session.save(function(err){
        if(err) next(err);
        return res.redirect("/registration");
      })
      
    }
    var[results, _] = await db.execute(`select id from users where email=?`, [email]);
    if(results && results.length > 0){
      console.log(`${email} already exists`);
      req.flash("error", "Registration failed: Email already exists.");
      return req.session.save(function(err){
        if(err) next(err);
        return res.redirect("/registration");
      })
    }

    //allows for hashed passwords
    var hashedPassword = await bcrypt.hash(password, 5);
    //insert into db
    var [insertResult, _] = await db.execute(
      `INSERT INTO users (username, email, password) VALUE (?,?,?);`,
      [username,email,hashedPassword]
    );

    
  //respond 
     if(insertResult && insertResult.affectedRows == 1){
      req.flash("success", "Registration successful: Please log in.");
      return req.session.save(function(err){
        if(err) next(err);
        return res.redirect("/login");
      })
     } else {
        return res.redirect("/registration");
     }
     
  }catch(err){
    next(err);
  }
});


//localhost:3000/users/login
router.post("/login", async function(req, res, next){
  var{username, password} = req.body;
  //server side validation
  //rules check
  try {
    // uniqueness check
    //does the username exist in the users table? runs sql statement giving the rows that have that username value
    var [results, _] = await db.execute(
      `select id, username, email, password from users where username=?`,
      [username]
    );
    const user = results[0];
    if(!user){
      req.flash("error", "Login Failed: Invalid Credentials");
      return req.session.save(function(err){
        if(err) next(err);
        return res.redirect("/login");
      })
      
    }
    var passwordsMatch = await bcrypt.compare(password, user.password);
    if(passwordsMatch){
      req.session.user = {
        userId: user.id,
        username: user.username,
        email: user.email
      };
      req.flash("success", "You are now logged in.");
      return req.session.save(function(err){
        if(err) next(err);
        return res.redirect("/");
      })
    } else {
      req.flash("error", "Login Failed: Invalid Credentials");
      return req.session.save(function(err){
        if(err) next(err);
        return res.redirect("/login");
      })
    }
  }catch(err){
    next(err);
  }
});

router.post("/logout", function (req, res,next){
  req.session.destroy(function(err) {
    if(err) next(err);
    return res.redirect("/");
  });
});
module.exports = router;
