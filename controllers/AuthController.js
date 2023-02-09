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
        const{name, email, password, confirmpassword} = req.body;

       if(password != confirmpassword){
        //
           req.flash('message', 'As senhas não conferem')
           res.render('auth/register')

           return 
       }

       //verifica se usuario existe

       const CheckIfUserExists =  await User.findOne({
        where:{ email: email} })


        if(CheckIfUserExists){
            req.flash('message', 'Usuário já existe')
            res.render('auth/register')
    
             return    

        }     
        
        

        //encriptando a senha
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
           
        //verificando se a senha foi encriptada
            // console.log(salt)
            //console.log(hashPassword)

       //salvando usuario no banco 
       const user ={
        name,
        email, 
        password: hashPassword,
       }

     
       //testando salvamento no banco
       User.create(user)
       .then((user) => {
         // incicializa a sessao do usuario
         req.session.userid = user.id
 
    
 
         req.flash('message', 'Cadastro realizado com sucesso!')
 
         req.session.save(() => {
           res.redirect('/')
         })
       })
       .catch((err) => console.log(err))
   }
 
 
     
      

    }


