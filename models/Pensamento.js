const {DataTypes} = require('sequelize');

const db = require('../db/conn');

const User = require('./User');
const Pensamento = db.define('pensamento', {
    tituto:{
            type: DataTypes.STRING,
            allowNull: false,  //não aceita valores nulos
            required: true,  //requisito obrigatório
        },
});


//relacionamento
Pensamento.belongsTo(User);
User.hasMany(Pensamento);


module.exports = Pensamento;