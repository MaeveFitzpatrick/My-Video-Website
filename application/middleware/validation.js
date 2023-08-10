const db = require('../config/database');
const validator = require('validator');

module.exports={
    checkUsername: function(req,res,next){
        var{username} = req.body;
        if(validator.isLength(username, {min: 3}) && validator.isAlpha(username)){
            next();
        } else {
            res.locals.perrors = "invalid username";
            req.flash("error", "Please try again.");
            return req.session.save(function(err){
                if(err) next(err);
                return res.redirect("/registration");
            })
        }

        
    },
    checkEmail: function(req,res,next){
        var{email} = req.body;
        if(validator.isEmail(email)){
            next();
        } else {
            res.locals.perrors = "invalid email";
            req.flash("error", "Please try again.");
            return req.session.save(function(err){
                if(err) next(err);
                return res.redirect("/registration");
        })
    }

        
    },
    checkPassword: function(req,res,next){
        var {password, cpassword} = req.body;
        if(validator.isStrongPassword(password) && password === cpassword){
            next();
        } else {
            res.locals.perrors = "invalid password";
            req.flash("error", "Please try again.");
            return req.session.save(function(err){
                if(err) next(err);
                return res.redirect("/registration");
        })
    }

        
    },
    doesUsernameExist: async function(req,res,next){
        var{username} = req.body;
        var[results, _] = await db.execute(`select id from users where username=?`,
        [username]);
            if(results && results.length > 0){
            console.log(`${username} already exists`);
            req.flash("error", "Registration failed: Username already exists.");
            return req.session.save(function(err){
                if(err) next(err);
                return res.redirect("/registration");
            })
        }else{
            next();
        }
    },
    doesEmailExist: async function(req,res,next){
        var {email} = req.body;
        var[results, _] = await db.execute(`select id from users where email=?`, [email]);
        if(results && results.length > 0){
            console.log(`${email} already exists`);
            req.flash("error", "Registration failed: Email already exists.");
            return req.session.save(function(err){
                if(err) next(err);
                return res.redirect("/registration");
            })
        } else {
            next();
        } 
    },
}