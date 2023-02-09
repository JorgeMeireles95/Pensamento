const User = require('../models/User');



//faz o hash da senha
const bcrypt = require('bcryptjs');


module.exports = class AuthController{
    
    static login (req, res){
        res.render('auth/login')
    }


    static async loginPost(req, res){
        const {email, password} = req.body;


        //usuario existe
        const user = await User.findOne({where: {email: email}})

        if(!user){
            req.flash('message', 'Usuário não existe')
            res.render('auth/login')
            return
        }


        //verifica se a senha está correta
        const checkPassword = bcrypt.compareSync(password, user.password);

        if(!checkPassword){
            req.flash('message', 'Senha incorreta')
            res.render('auth/login')
            return
        }


        //inicializa a sessão do usuario
        req.session.userid = user.id
        req.flash('message', 'Login realizado com sucesso!')
        req.session.save(() => {
            res.redirect('/')
        })

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
           res.redirect('/register')
         })
       })
       .catch((err) => console.log(err))
   }



    static logout(req, res){
        //remove a sessão do sistema
        req.session.destroy()
        res.redirect('/login')
    }
 

}
