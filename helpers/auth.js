module.exports.checkAuth = (req, res, next) => {

  const userId = req.session.userid;



  if(!userid){
    
        res.redirect('/login');
  }
next();

}