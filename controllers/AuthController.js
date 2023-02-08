const User = require('../models/User');



//faz o hash da senha
const bcrypt = require('bcryptjs');


module.exports = class AuthController{
    static login (req, res){
        res.render('auth/login')
    }


    static register(req, res){
        res.render('auth/register')
    }



    static async registerPost(req, res){
        const{name, email, password, confirpassword} = req.body;

       if(password != confirpassword){
        //
           req.flash('message', 'As senhas não conferem')
           res.render('auth/register')

           return 
       }

    }
}

