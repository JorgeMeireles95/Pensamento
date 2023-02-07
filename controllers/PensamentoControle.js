const Pensamento = require('../models/Pensamento.js');
const User = require('../models/User.js');


module.exports = class PensamentoController{
    static async showPensamentos( req, res){
        res.render("pensamentos/home");

    }
}