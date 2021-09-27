const { Router } = require('express');
const {Dog} = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async function(req, res){
	try{
		const dog = await Dog.findAll();
		return res.status(200).json(dog.dataValues);
	}catch(e){
		return res.status(500).json('We have an error with your request')
	}
})

module.exports = router;
