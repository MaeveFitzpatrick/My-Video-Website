var express = require('express');
const { isLoggedIn } = require("../middleware/auth");
var router = express.Router();

/* GET home page. */
router.get('/', 
// getRecentPosts, 
function(req, res, next) {
  // res.locals.results=[];
  res.render("index");
});

router.get("/login", function(req,res,next){
  res.render('login',{title:"Login", css:["formstyle.css"]})
});

router.get("/registration", function(req,res,next){
  res.render('registration',{title:"Registration", css:["formstyle.css"]})
});


router.get("/postvideo", isLoggedIn, function(req,res,next){
  res.render('postvideo',{title:"Post Video", css:["formstyle.css"]/*, js:["validation.js"]*/})
});





module.exports = router;
