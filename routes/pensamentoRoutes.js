const express = require('express');
const router = express.Router();


//controller
const PensamentoController = require('../controllers/PensamentoControle.js');





router.get('/', PensamentoController.showPensamentos);







module.exports = router;