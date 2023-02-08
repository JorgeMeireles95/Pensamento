const express = require('express');
const router = express.Router();


//controller
const PensamentoController = require('../controllers/PensamentoController.js');





router.get('/', PensamentoController.showPensamentos);







module.exports = router;