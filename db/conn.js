const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('pensamentos', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});
try{
    sequelize.authenticate();
    console.log('Conectado com sucesso!');
}catch{
    console.log('Erro ao conectar!');
}


module.exports = sequelize;