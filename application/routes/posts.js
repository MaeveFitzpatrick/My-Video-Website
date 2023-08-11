var express = require('express');
var router = express.Router();
var multer = require('multer');
const {makeThumbnail, getPostById, getCommentsForPostById} = require('../middleware/posts');
const { isLoggedIn } = require('../middleware/auth');
const db = require('../config/database');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/videos')
    },
    filename: function (req, file, cb) {
        const fileExt = file.mimetype.split('/')[1];
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`)
    }
  })
  
  const upload = multer({ storage: storage })


  //localhost:3000/posts/create
router.post('/create', isLoggedIn, upload.single('uploadVideo'), makeThumbnail, async function(req, res, next){
    var {title, description} = req.body;
    var {path, thumbnail} = req.file;
    var {userId} = req.session.user;

    try {
        console.log([title,description, path, thumbnail, userId]);
        var [insertResult, _] = await db.execute(`INSERT INTO posts (title, description, video, thumbnail, fk_userid)
        VALUE
        (?,?,?,?,?);`, [title,description, path, thumbnail, userId]);

        if(insertResult && insertResult.affectedRows){
            req.flash("success", "Your post was created.");
            return req.session.save(function(err){
                if(err) next(err);
                return res.redirect('/');
            })
        } else {
            req.flash("error", "Your post could not be made, please try again later.");
            return req.session.save(function(err){
                if(err) next(err);
                return res.redirect('/postvideo');
            })
        }
    } catch (err) {
        next(err);
    }
});

//localhost:3000/posts/search?key=value
router.get("/search", async function(req,res,next){
  var {key} = req.query;
  const searchValue = `%${key}%`;

  try {
    var [results, _] = await db.execute(`select id, title, description, thumbnail, concat_ws("", title, description) as haystack
    FROM posts
    HAVING haystack like ?;`, [searchValue]);
    if(results && results.length > 0){
      res.locals.count = results.length;
      res.locals.results = results;
      res.locals.searchValue = key;
      return res.render('index');
    }else{
      //no rows returned
      //respond in someway
      res.locals.count = results.length;
      res.locals.results = results;
      return res.render('index');
    }
    
  }catch(err) {
    next(err);
  }
})



router.get("/:id(\\d+)", getPostById,function(req,res,next){
    res.render("viewpost",{
      title:`View Post ${req.params.id}`, 
      js:["viewpost.js"]
    });
  });



module.exports = router;