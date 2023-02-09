const Pensamento = require('../models/Pensamento.js');
const User = require('../models/User.js');


module.exports = class PensamentoController{
    static async showPensamentos( req, res){
        res.render("pensamentos/home");

    }



    static async dashboard(req, res){
        const pensamentos = await Pensamento.findAll({
            where: {user_id: req.session.userid},
            include: [{model: User, as: 'user'}]
        })

        res.render('pensamentos/dashboard', {pensamentos: pensamentos})
    }
}