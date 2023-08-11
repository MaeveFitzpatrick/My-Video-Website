module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.session.user) {
            next();
        } else {
            req.flash("error", "Error: Must be logged in to create a post.");
            req.session.save(function(err) {
                if(err) next(err);
                res.redirect("/login");
            });
        }
    },

    isLoggedInJSON: function(req, res, next){
        if(req.session.user) {
            next();
        } else {
            req.flash("error", "Error: Must be logged in to create a comment.");
            return req.session.save(function(err) {
                if(err) next(err);
                return res.status(401).json({
                    status:"failed",
                    statusCode: -1,
                    message: "Must be logged in to create a comment.",
                    redirectTo:"/login"

                })
            });
        }
    }
}