const express = require('express');
const router = express.Router();


//controller
const PensamentoController = require('../controllers/PensamentoController.js');




///helper
//verifica se o usuario está logado para acessar a rotas
const { checkAuth } = require('../helpers/auth.js');

router.get('/add',checkAuth, PensamentoController.criaPensamento);
router.get('/dashboard',checkAuth, PensamentoController.dashboard);
router.get('/',PensamentoController.showPensamentos);







module.exports = router;